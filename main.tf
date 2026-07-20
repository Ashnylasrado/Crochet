provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "demo" {
  ami           = "ami-0c02fb55956c7d316"  # example Amazon Linux AMI, verify it's valid for your region
  instance_type = "t3.micro"

  tags = {
    Name = "github-actions-demo"
  }
}
