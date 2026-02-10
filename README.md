**ProviderPlus** is a cross-platform service management ecosystem. This repository serves as the central "Source of Truth" for both the backend infrastructure, the mobile client and the marketing page.

---

## 📂 Project Architecture

The repository is organized into two primary modules:

| Module | Stack | Description |
| :--- | :--- | :--- |
| **`backendapi/`** | FastAPI, Uvicorn | High-performance REST API handling business logic and data persistence. |
| **`mobileapp/`** | React Native, Expo | User-facing mobile application for iOS and Android. |

---

## 🌿 Development Workflow

We utilize a **Forking Workflow** to maintain code quality and stability.

### Branching Strategy
1. **`main`**: Production-ready stable code. Direct commits are restricted.
2. **`dev`**: The integration branch for active development. **All Pull Requests should target this branch.**
3. **Feature Branches**: Individual tasks should be completed in isolated branches (e.g., `feature/auth-system` or `bugfix/api-latency`).

### Contribution Steps
1. **Sync**: Ensure your fork is up-to-date with the `upstream/dev` branch.
2. **Branch**: Create a local feature branch from `dev`.
3. **Submit**: Open a Pull Request (PR) targeting the `dev` branch of the main repository.
4. **Review**: All code is subject to peer review and automated testing before being merged by the Repository Owner.
