# StyleSphere E-commerce Platform: A Scalable Cloud Deployment

A presentation on building a secure, scalable, and resilient cloud infrastructure on AWS for a startup e-commerce platform.

---

## Slide 1: Title Slide

**Project Title:** StyleSphere - A Scalable E-commerce Launch Platform

**Scenario:** 1 - E-commerce Startup Launch

**Presented By:** [Your Name / Your Group's Names]

**Course/Context:** [Your Course Name, e.g., Cloud Computing Project]

---

## Slide 2: Agenda

1.  **Scenario Overview:** Introducing "StyleSphere"
2.  **Cloud Architecture:** The Final Topology Diagram
3.  **Chosen AWS Services & Justification:** Why We Chose Them
4.  **Security by Design:** Measures at Every Layer
5.  **Docker & Containerization:** Our Implementation Strategy
6.  **Storage Solution:** S3 for Assets
7.  **Load Balancing Strategy:** Intelligent Traffic Routing
8.  **Challenges & Solutions:** Overcoming Real-World Hurdles
9.  **Future Improvements:** How We Can Make It Even Better
10. **Live Demonstration**
11. **Q&A**

---

## Slide 3: Scenario Overview: "StyleSphere"

*   **The Business:** A new online retail startup specializing in sustainable fashion.
*   **The Challenge:** Prepare for an initial product launch with an anticipated growing user base.
*   **The Need:** A platform that is **Scalable** to handle traffic spikes, **Secure** to protect the application, and **Resilient** to stay online.
*   **Our Goal:** To build a classic multi-tier web application architecture on AWS that meets these needs using industry best practices.

---

## Slide 4: Cloud Architecture Topology

*(This is where you would insert the final architecture diagram we created. The diagram visualizes the flow of traffic from the user through the AWS infrastructure to the application.)*

**Key Features of the Architecture:**
*   High Availability across two Availability Zones (AZs).
*   Secure isolation with a custom Virtual Private Cloud (VPC).
*   Scalability with an Auto Scaling Group.
*   Intelligent traffic management with an Application Load Balancer.

---

## Slide 5: Chosen AWS Services & Justification

| Service | Component | Justification |
| :--- | :--- | :--- |
| **Networking** | **VPC, Subnets, IGW, NAT Gateway** | **Foundation:** To create a logically isolated, private, and secure network in the AWS cloud, giving us full control over the environment. |
| **Compute** | **EC2 (t2.micro/small)** | **Core Servers:** Provides the virtual servers needed to run our application code and Docker engine. Chosen for its flexibility and control. |
| **Scalability** | **Auto Scaling Group (ASG)** | **Resilience & Elasticity:** Automatically manages the health and number of EC2 instances. Scales out to handle more traffic and scales in to save costs. |
| **Load Balancing**| **Application Load Balancer (ALB)** | **Traffic Director:** Distributes incoming traffic across multiple instances. Provides path-based routing to direct users to the frontend and API calls to the backend. |
| **Security**| **IAM, ACM, Security Groups** | **Protection:** Manages access and permissions, provides free SSL/TLS certificates for HTTPS, and acts as a stateful firewall for our resources. |
| **Storage**| **S3 & EBS** | **Asset Management:** S3 is used for durable, scalable object storage for product images. EBS provides the root block storage for our EC2 instances. |

---

## Slide 6: Security Measures Implemented

*   **Network Layer Security:**
    *   **VPC:** The application is deployed in a custom VPC, isolating it from other AWS customers.
    *   **Public/Private Subnets:** The ALB is placed in public subnets, but the EC2 instances running the code are in private subnets, protecting them from direct internet access.
    *   **NACLs:** Act as a stateless firewall at the subnet level (we used the default, permissive NACLs but could tighten them for more security).

*   **Application Layer Security:**
    *   **Security Groups:** Act as stateful firewalls for our resources.
        *   `ALB-SG` only allows web traffic (Port 80/443) from the internet.
        *   `WebApp-SG` only allows traffic from the ALB on the specific application ports (3000/5000).
    *   **HTTPS:** The ALB is configured with an SSL certificate from ACM to encrypt all traffic between the user and the application (`HTTPS`). We implemented a redirect to force all HTTP traffic to HTTPS.

*   **Data Layer Security:**
    *   **S3 Bucket Policy:** Our public S3 bucket is configured with a read-only bucket policy (`s3:GetObject`). This allows everyone to view the images but prevents anyone from deleting or modifying them.

---

## Slide 7: Docker Implementation Details

*   **Containerization Strategy:** We containerized both the frontend (Next.js) and backend (Python/Flask) applications to ensure a consistent and portable runtime environment.

*   **Dockerfiles:**
    *   **Backend Dockerfile:** Uses an official `python:3.9-slim` image, installs dependencies from `requirements.txt`, and runs the Flask application.
    *   **Frontend Dockerfile:** Uses a multi-stage build with a `node:18-alpine` image. It first builds the Next.js application for production and then copies the optimized build artifacts into a clean, minimal final image.

*   **Image Management (`docker-compose.yml`):**
    *   We used a single `docker-compose.yml` file to define and manage our multi-container application.
    *   This file defines the two services (`frontend` and `backend`), specifies their build contexts, and maps the container ports (3000, 5000) to the host EC2 instance.
    *   The entire application is started with a single command: `docker-compose up --build -d`.

---

## Slide 8: Storage Solution Details

*   **Object Storage (Amazon S3):**
    *   **Purpose:** Used to store and serve the static product images for the StyleSphere website.
    *   **Configuration:** We configured a publicly accessible S3 bucket.
    *   **Security:** To secure the assets, we applied a read-only Bucket Policy. This allows users' browsers to load the images, but prevents any unauthorized modification or deletion of the files.

*   **Block Storage (Amazon EBS):**
    *   **Purpose:** Every EC2 instance is backed by an EBS volume, which serves as its root disk.
    *   **Function:** It stores the Ubuntu operating system, the installed software (Docker, Git), and the application code cloned from GitHub. It is ephemeral in our architecture, as we can terminate and replace instances at any time.

---

## Slide 9: Load Balancing Strategy

*   **Service Used:** Application Load Balancer (ALB).
*   **Justification:** An ALB was chosen because it operates at the application layer (Layer 7) and can make intelligent routing decisions based on the content of the request, which is perfect for our multi-service application.

*   **Implementation:**
    *   **High Availability:** The ALB is deployed across our two public subnets in different Availability Zones.
    *   **HTTPS Termination:** The ALB handles the SSL/TLS handshake, encrypting traffic from the user. It then communicates with our backend instances over standard HTTP within our secure VPC.
    *   **Path-Based Routing:** We configured two primary listener rules on the HTTPS listener:
        1.  **API Rule:** If the URL path matches `/api/*`, the ALB forwards the request to the `stylesphere-backend-tg` target group on port **5000**.
        2.  **Default Rule:** For all other requests, the ALB forwards the traffic to the `stylesphere-frontend-tg` target group on port **3000**.

---

## Slide 10: Challenges Faced & Solutions Implemented

1.  **Challenge:** 502 Bad Gateway Error after initial deployment.
    *   **Troubleshooting:** We checked the Target Group health status and found the instances were `unhealthy`. We then inspected the EC2 System Logs.
    *   **Root Cause:** The `npm run build` process was consuming all the memory of the `t2.micro` instance, causing the OS to kill the process before it could finish.
    *   **Solution:** While we initially thought it was a memory issue, we realized the build was simply taking a long time. The final working solution was to give the instances more time to build and become healthy. The `t2.micro` was sufficient after all.

2.  **Challenge:** HTTPS certificate not appearing when configuring the Load Balancer.
    *   **Troubleshooting:** The option to select an SSL certificate was completely missing from the AWS Console.
    *   **Root Cause:** AWS services like ACM are **Region-specific**. The certificate was created in a different AWS Region than the Load Balancer.
    *   **Solution:** We deleted the old certificate and re-created it in the **same AWS Region** as our VPC and ALB.

3.  **Challenge:** Invalid self-signed certificate error from the ALB.
    *   **Troubleshooting:** The ALB rejected our first self-signed certificate.
    *   **Root Cause:** The `openssl` command was run without providing a "Common Name," which the ALB requires to look like a valid domain.
    *   **Solution:** We re-generated the certificate, this time providing a mock domain (e.g., `stylesphere.com`) for the Common Name field.

---

## Slide 11: Potential Future Improvements

*   **CI/CD Pipeline:** Implement AWS CodePipeline or GitHub Actions to automate the process of building and deploying code changes, eliminating the need to build on the EC2 instances themselves. This would lead to faster deployments and fewer errors.

*   **Managed Database:** Replace the hardcoded product list with a managed database service like **Amazon RDS** (for SQL) or **Amazon DynamoDB** (for NoSQL) to store product information dynamically.

*   **Custom Domain & DNS:** Use **Amazon Route 53** to register a custom domain name (e.g., `www.stylesphere.com`) and point it to the Application Load Balancer. Use ACM to provision a free, trusted SSL certificate for this domain.

*   **Monitoring & Alarms:** Implement **Amazon CloudWatch** to monitor key metrics like CPU utilization on the EC2 instances. Create CloudWatch Alarms to trigger scaling actions more intelligently or to send notifications if something goes wrong.

*   **Use a "Golden AMI":** To speed up launch times, create a custom Amazon Machine Image (AMI) that has Docker and all dependencies pre-installed. The user data script would then be much shorter and faster.

---

## Slide 12: Live Demonstration

*(This is where you would switch from the slides to a live demonstration of the working website, showing the ALB URL and navigating the pages.)*

**Points to Demo:**
*   Show the application running at the secure `https://` ALB endpoint.
*   Browse the home page and individual product pages.
*   Show the Network tab in the browser's developer tools to illustrate the API calls to `/api/products`.
*   Briefly show the healthy targets in the AWS Console Target Groups.
*   Demonstrate stopping the application by setting the Auto Scaling Group's desired capacity to `0`.

---

## Slide 13: Thank You & Q&A

**Thank you for your time.**

**Are there any questions?** 