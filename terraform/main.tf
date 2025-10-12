

resource "random_id" "bucket_prefix" {
  byte_length = 8
}

resource "aws_s3_bucket" "bank_frontend" {
  bucket        = "${var.project_name}-${random_id.bucket_prefix.hex}"
  force_destroy = true
}

resource "aws_s3_bucket_website_configuration" "bank_frontend" {
  bucket = aws_s3_bucket.bank_frontend.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_public_access_block" "bank_frontend" {
  bucket = aws_s3_bucket.bank_frontend.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "this" {
  bucket = aws_s3_bucket.bank_frontend.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_policy" "bank_frontend" {
  bucket = aws_s3_bucket.bank_frontend.id
  policy = data.aws_iam_policy_document.s3_policy_document.json
}

resource "aws_cloudfront_origin_access_identity" "bank_frontend" {
  comment = "Origin Access Identity for S3"
}

resource "aws_cloudfront_distribution" "bank_frontend" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "${var.project_name} distribution"
  default_root_object = "index.html"

  origin {
    domain_name = aws_s3_bucket.bank_frontend.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.bank_frontend.bucket_regional_domain_name

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.bank_frontend.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = aws_s3_bucket.bank_frontend.bucket_regional_domain_name
    compress         = true

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 300
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  aliases = []
}

output "website_url" {
  description = "Full URL of the website"
  value       = "https://${aws_cloudfront_distribution.bank_frontend.domain_name}"
}

output "s3_bucket_name" {
  value = aws_s3_bucket.bank_frontend.bucket
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.bank_frontend.id
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.bank_frontend.domain_name
}
