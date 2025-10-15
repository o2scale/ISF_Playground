# **Playground Platform \-  Sprint Plan**

### **Development Approach**

* Agile (Scrum) with **5 sprints (4 weeks each)**  
* Bi-weekly progress reviews and CI/CD deployment strategy  
* Parallel backend & frontend work streams for efficient development

---

## **Sprint 1: MVP – Core Platform Setup**

### **Scope**

The first sprint focuses on establishing the core system, including authentication, user management, machine tracking, and task management. This ensures a stable foundation for future feature additions.

### **Key Deliverables**

* **Admin Dashboard & User Management**: Develop CRUD operations for users with Role-Based Access Control (RBAC).  
* **Machine Registration & Authentication**: Implement device authentication via unique identifiers (MAC address, serial number).  
* **Machine Allocation & Management**: Enable assignment of machines to Balagruhs and track allocation history.  
* **Machine Usage & Access Control**: Restrict platform access to authenticated devices only.  
* **Machine Tracking & Reports**: Generate real-time reports on machine activity and utilization.  
* **Admin & User Permissions**: Define role-based access levels for Admins, Coaches, Balagruh In-Charges, and Students.  
* **Balagruh (Orphanage) Management**: Implement orphanage data management, including student allocation.  
* **Task Management Module**: Develop task creation, assignment, and tracking system.

### **Tasks**

* Backend: API development for authentication, user roles, and task management.  
* Frontend: UI implementation for dashboards, authentication screens, and task workflows.  
* Database: Design schema for user roles, task assignments, and machine tracking.  
* QA: Security testing for authentication, API validation, and RBAC enforcement.

---

## **Sprint 2: Learning & Content Management** 

### **Scope**

This sprint introduces the LMS infrastructure, enabling content uploads, assessments, and third-party tool integrations for learning purposes.

### **Key Deliverables**

* **Course Management Module**: Implement course creation, assignment, and tracking for Coaches.  
* **Test Creation Module**: Develop tools for creating and managing assessments.  
* **External Tool Integration**: Integrate third-party learning tools (e.g., SpeechSuper API).  
* **Translation Module**: Enable multilingual support for platform accessibility.  
* **Content Management Module**: Provide CRUD operations for learning materials.  
* **Media Management Module (Web App)**: Allow Coaches/Admins to upload course content (videos, documents, etc…).  
* **Amma role**

### **Tasks**

* Backend: Develop APIs for course management, test creation, and media storage.  
* Frontend: Implement UI for course creation, content upload, and test assignment.  
* Database: Structure learning content storage and retrieval.  
* QA: Validate content upload functionalities, test role-based access for media management.

---

## 

## **Sprint 3: Mobile App Development & Attendance Tracking** 

### **Scope**

The focus of this sprint is the development of the **mobile app** for Coaches, Admins, and Balagruh In-Charges. The app will support attendance tracking and media uploads.

### **Key Deliverables**

* **Platform Access & Device Support**: Develop a mobile app.  
* **Attendance Tracking (Facial Recognition)**: Enable Balagruh In-Charges to upload class photos for FR-based attendance logging.  
* **Media Management Module (Mobile App)**: Implement content upload functionality for mobile users.  
* **Progress Tracking & Analytics**: Provide performance reports for Admins.  
* **Notifications/Alerts/Reports**: Implement push notifications for attendance and task updates.

### **Tasks**

* Mobile App: Develop UI for dashboards, attendance uploads, and media management.  
* Backend: Create API endpoints for attendance submission and tracking.  
* Frontend: Implement reporting dashboards.  
* QA: Test mobile app performance, security, and notifications.

---

## **Sprint 4: Emergency Features & Communication** 

### **Scope**

This sprint focuses on the **SOS system and internal communication features**. The SOS function is for students on the **desktop app**, while Coaches and Admins will **receive alerts on the mobile app**.

### **Key Deliverables**

* **SOS Functionality**: Students trigger emergency alerts from the desktop app, which are received on the mobile app by Coaches/Admins.  
* **Messaging & Communication Module**: Enable internal messaging for Coaches, Admins, and Balagruh In-Charges.  
* **WhatsApp-Based Notifications**: Integrate WhatsApp API for automated notifications.  
* **Student Health Tracking Module**: Monitor student well-being trends and tie them into SOS alerts.

### **Tasks**

* Backend: Develop SOS alert API and escalation workflow.  
* Frontend: Implement UI for SOS alerts and in-app messaging.  
* Mobile App: Enable push notifications for emergency alerts.  
* QA: Test escalation mechanisms and messaging reliability.

---

## 

## **Sprint 5: E-Commerce & Final Refinements**

### **Scope**

The final sprint builds the **ISF Shop** and **virtual rewards system**, along with bug fixes and final testing.

### **Key Deliverables**

* **ISF Shop Module**: Implement a student rewards store for redeeming virtual currency.  
* **Coin Distribution Reports**: Track student engagement and reward distribution.  
* **Inventory Management Module**: Manage stock for ISF Shop items.  
* **Open Source App Integration**: Final integrations with open-source tools.  
* **Deliverables & Final Refinements**: Security audits, performance optimization, and documentation.

### **Tasks**

* Backend: Implement transaction handling for virtual currency.  
* Frontend: Develop UI for the ISF Shop and inventory tracking.  
* QA: Test payment system, bug fixes, and security enhancements.  
* Deployment: Go live with final production release.

---

# **Summary of Sprint Plan Execution**

* **Sprint 1:** Core platform & user management.  
* **Sprint 2:** LMS, content management & media uploads (Web).  
* **Sprint 3:** Mobile app for Coaches/Admins & attendance tracking.  
* **Sprint 4:** SOS alerts, messaging & notifications.  
* **Sprint 5:** ISF Shop, inventory & final refinements.

---

This plan ensures **efficient, phased delivery** of the Playground platform while following **Agile best practices**.

