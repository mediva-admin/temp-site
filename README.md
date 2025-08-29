# Test Repository

## Repository Rules & Guidelines

This repository follows strict architectural and development guidelines to maintain code quality and consistency.

### 🎨 UI Library Constraints
- **Single UI Library Rule**: Never use more than one UI library in this project
- Maintain consistency across all UI components
- Document any UI library dependencies in the project setup

### 🚀 API Architecture
- **Service Layer Pattern**: All API calls must be implemented in dedicated service files
- **API Client Usage**: Always check the `api-client/` folder first for auto-generated code from OpenAPI spec files
- **Direct Integration**: Service layer must use the auto-generated API client directly when available
- **DTO Usage**: Use the auto-generated DTOs (Data Transfer Objects) from the API client for type safety
- Keep API logic centralized and reusable
- Implement proper error handling and response management

### 🔄 Data Management
- **Utils Folder**: All data transformation logic should be placed in the `utils/` folder
- Separate business logic from presentation logic
- Maintain clean separation of concerns

### 📋 Documentation
- **Spec Files**: Include specification files for all major features
- Document API contracts, component interfaces, and data models
- Keep documentation up-to-date with code changes

### 📁 Project Structure
```
test_repo/
├── api-client/       # Auto-generated API client from OpenAPI specs
├── services/         # API service files (use api-client directly)
├── utils/            # Data transformation utilities
├── components/       # UI components
├── specs/           # Specification files
└── README.md        # This file
```

### ✅ Code Quality Standards
- Follow consistent naming conventions
- Implement proper error handling
- Write clean, maintainable code
- Add appropriate comments and documentation

---

*Last updated: [Current Date]*

