---
order: 2
chapter: kyndryl
title: GenAI triage for credit-card service requests
status: uat
size: short
problem: The card-support team read and tagged every incoming request by hand before it could be routed.
built: A triage layer on AWS Bedrock that classifies each request against the bank's taxonomy, splits tickets that bundle several issues, and extracts structured details. Runs as an unattended daily job.
stack: [AWS Bedrock, Python]
---
