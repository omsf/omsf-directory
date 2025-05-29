# Tasks to Complete Form Implementation

Based on the schema analysis, the following fields are missing from the form:

## Missing Fields
1. **languages** - Multi-select field from `languageTags` array (Python, C++, Fortran, Rust, Julia, R)
2. **project** - Optional select field from `omsfProjects` enum (Open Force Field, Open Free Energy, Open Fold)

## Tasks

### Task 1: Add Languages Multi-Select Field
- [ ] Create or modify GenericSelect component to support multi-select
- [ ] Add languages field to the form using languageTags from schemas
- [ ] Update form state handling for languages array
- [ ] Test that languages are properly selected and stored

### Task 2: Add Project Optional Select Field  
- [ ] Add project select field to the form using omsfProjects enum
- [ ] Export omsfProjects from schemas.ts to make it available
- [ ] Add project field handling in form state
- [ ] Test project selection works correctly

### Task 3: Update YAML Generation
- [ ] Include languages array in YAML output generation
- [ ] Include project field in YAML output (when selected)
- [ ] Format arrays properly in YAML output
- [ ] Test YAML generation with all fields

### Task 4: Update Card Component
- [ ] Ensure Card component can display languages array
- [ ] Ensure Card component can display project field
- [ ] Test card preview updates correctly with new fields

### Task 5: Final Testing and Validation
- [ ] Test form validation with all required fields
- [ ] Test that optional fields work correctly
- [ ] Verify YAML output matches expected format
- [ ] Test copy to clipboard functionality

## Commit Strategy
- Make one commit per completed task
- Each commit should have a descriptive message
- Test functionality before each commit