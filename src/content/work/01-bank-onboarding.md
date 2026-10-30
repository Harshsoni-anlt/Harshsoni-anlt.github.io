---
order: 1
chapter: kyndryl
title: Paper forms → clean records for a regulated bank
status: production
size: lead
problem: Staff keyed customer data off scanned account-opening forms for every new account. Slow, error-prone, and a bottleneck on onboarding.
constraint: Regulated bank · scanned paper · sensitive personal fields
built: An end-to-end OCR pipeline on AWS Textract that tells form types apart, extracts the right fields for each, validates and encrypts sensitive data, then pushes clean records into downstream systems. Taken from a working PoC to the production process the bank now runs on.
stack: [AWS Textract, Python, encryption, validation rules]
---
