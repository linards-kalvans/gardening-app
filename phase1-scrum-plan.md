# Phase 1 Scrum Development Plan
## Gardening App MVP (Months 1-3.5)

### Sprint Overview
- **Sprint Duration**: 2 weeks
- **Total Sprints**: 7 sprints (14 weeks)
- **Team Size**: 1 Full-Stack Developer + 1 UI/UX Designer (part-time)
- **Sprint Planning**: 2 hours
- **Daily Standups**: 15 minutes
- **Sprint Review**: 1 hour
- **Sprint Retrospective**: 1 hour

---

## Sprint 1 (Weeks 1-2): Project Setup & Authentication
**Goal**: Establish development environment and user authentication

### User Stories
1. **As a user**, I want to sign in with my Google account so I can access the gardening app quickly
2. **As a user**, I want to sign in with my Facebook account so I can use my existing social login
3. **As a user**, I want to log out securely so I can protect my garden data

### Technical Tasks
- [ ] Set up local development environment (React.js, Node.js, PostgreSQL)
- [ ] Set up Docker containers for local development
- [ ] Configure Google OAuth 2.0 integration
- [ ] Configure Facebook OAuth 2.0 integration
- [ ] Implement SSO authentication API
- [ ] Set up authentication middleware
- [ ] Create basic database schema
- [ ] Design and implement SSO login UI
- [ ] Set up local CI/CD pipeline
- [ ] Configure environment variables and security

### Acceptance Criteria
- Users can sign in with Google account
- Users can sign in with Facebook account
- Users can log out securely
- SSO authentication works reliably
- Basic security measures implemented
- Development environment fully functional

### Story Points: 21
### Sprint Capacity: 20 points

---

## Sprint 2 (Weeks 3-4): User Profile & Garden Setup
**Goal**: Allow users to set up their garden profile

### User Stories
1. **As a user**, I want to set up my garden profile so the app can provide relevant suggestions
2. **As a user**, I want to input my location so I can get climate-appropriate recommendations
3. **As a user**, I want to specify my garden size so the app can suggest appropriate plants

### Technical Tasks
- [ ] Create user profile database schema
- [ ] Implement profile creation API
- [ ] Implement profile update API
- [ ] Add location input with city selection
- [ ] Add garden size selection (small/medium/large)
- [ ] Add soil type selection (clay/sandy/loamy)
- [ ] Add sun exposure selection (full sun/partial shade/full shade)
- [ ] Design profile setup wizard UI
- [ ] Implement form validation
- [ ] Add profile completion tracking

### Acceptance Criteria
- Users can complete garden profile setup
- Profile data is saved and retrievable
- Form validation prevents invalid data
- Wizard guides users through setup process
- Profile can be updated later

### Story Points: 18
### Sprint Capacity: 20 points

---

## Sprint 3 (Weeks 5-6): Basic Garden Layout
**Goal**: Allow users to create and edit garden layouts

### User Stories
1. **As a user**, I want to create a garden layout so I can plan my garden
2. **As a user**, I want to add garden beds to my layout so I can organize my planting areas
3. **As a user**, I want to edit my garden layout so I can adjust my plans

### Technical Tasks
- [ ] Create garden layout database schema
- [ ] Implement garden creation API
- [ ] Implement garden bed creation API
- [ ] Implement layout update API
- [ ] Design garden layout editor UI
- [ ] Implement drag-and-drop garden bed creation
- [ ] Add garden bed sizing and positioning
- [ ] Implement layout saving and loading
- [ ] Add basic garden visualization
- [ ] Implement garden deletion

### Acceptance Criteria
- Users can create new gardens
- Users can add and position garden beds
- Users can edit garden layouts
- Layouts are saved and can be retrieved
- Basic visual representation of garden

### Story Points: 22
### Sprint Capacity: 20 points

---

## Sprint 4 (Weeks 7-8): Plant Database & Selection
**Goal**: Implement basic plant database and selection

### User Stories
1. **As a user**, I want to browse edible plants so I can choose what to grow
2. **As a user**, I want to search for plants so I can find specific varieties
3. **As a user**, I want to see plant details so I can make informed decisions

### Technical Tasks
- [ ] Create plant database schema
- [ ] Implement plant data seeding (50-100 edible plants)
- [ ] Implement plant search API
- [ ] Implement plant details API
- [ ] Add plant filtering by category (vegetables, herbs, fruits)
- [ ] Design plant browser UI
- [ ] Implement plant search functionality
- [ ] Design plant detail view
- [ ] Add plant images and descriptions
- [ ] Implement plant favorites

### Acceptance Criteria
- Users can browse plant database
- Users can search for specific plants
- Plant details are displayed clearly
- Search functionality works effectively
- Plants are categorized appropriately

### Story Points: 20
### Sprint Capacity: 20 points

---

## Sprint 5 (Weeks 9-10): Plant Placement & Tracking
**Goal**: Allow users to place plants in their garden and track them

### User Stories
1. **As a user**, I want to add plants to my garden beds so I can track what I'm growing
2. **As a user**, I want to see what plants are in each garden bed so I can remember my layout
3. **As a user**, I want to remove plants from my garden so I can update my plans

### Technical Tasks
- [ ] Create plant placement database schema
- [ ] Implement plant placement API
- [ ] Implement plant removal API
- [ ] Design plant placement UI
- [ ] Implement drag-and-drop plant placement
- [ ] Add plant quantity tracking
- [ ] Implement plant bed visualization
- [ ] Add plant placement validation
- [ ] Implement plant history tracking
- [ ] Add plant placement editing

### Acceptance Criteria
- Users can place plants in garden beds
- Plant placements are visually represented
- Users can see all plants in each bed
- Plants can be removed and replaced
- Plant quantities are tracked

### Story Points: 21
### Sprint Capacity: 20 points

---

## Sprint 6 (Weeks 11-12): Basic Reminders & Polish
**Goal**: Implement basic reminder system and polish MVP

### User Stories
1. **As a user**, I want to receive watering reminders so I don't forget to water my plants
2. **As a user**, I want to see upcoming garden tasks so I can plan my gardening activities
3. **As a user**, I want to mark tasks as completed so I can track my progress

### Technical Tasks
- [ ] Create reminder database schema
- [ ] Implement reminder generation logic
- [ ] Implement reminder API
- [ ] Design reminder UI
- [ ] Add reminder notifications
- [ ] Implement task completion tracking
- [ ] Add reminder settings
- [ ] Implement reminder history
- [ ] Add basic garden analytics
- [ ] Polish UI and fix bugs

### Acceptance Criteria
- Users receive watering reminders
- Reminders are displayed clearly
- Users can mark tasks as completed
- Reminder settings are configurable
- Basic analytics show garden progress

### Story Points: 19
### Sprint Capacity: 20 points

---

## Sprint 7 (Weeks 13-14): Cloud Deployment & Testing
**Goal**: Deploy MVP to cloud and conduct final testing

### User Stories
1. **As a user**, I want to access the app from any device so I can use it anywhere
2. **As a user**, I want my data to be backed up so I don't lose my garden information
3. **As a user**, I want the app to be fast and reliable so I can use it effectively

### Technical Tasks
- [ ] Configure cloud infrastructure (Hetzner Cloud or Scaleway)
- [ ] Set up production database
- [ ] Configure cloud storage for images
- [ ] Set up production CI/CD pipeline
- [ ] Deploy application to cloud
- [ ] Configure domain and SSL certificates
- [ ] Set up monitoring and logging
- [ ] Conduct load testing
- [ ] Perform security testing
- [ ] Set up backup and disaster recovery

### Acceptance Criteria
- Application is accessible from cloud
- All features work in production
- Performance is acceptable
- Security measures are in place
- Backup systems are functional

### Story Points: 18
### Sprint Capacity: 20 points

---

## Product Backlog (Prioritized)

### High Priority (Must Have for MVP)
1. SSO authentication (Google, Facebook) and profile setup
2. Basic garden layout creation
3. Plant database with search
4. Plant placement and tracking
5. Basic reminder system
6. Cloud deployment and testing

### Medium Priority (Nice to Have)
1. Plant care instructions
2. Garden photo upload
3. Basic plant recommendations
4. Export garden data
5. Mobile app optimization
6. Traditional email/password authentication (future)

### Low Priority (Future Releases)
1. Advanced plant recommendations
2. Community features
3. Garden sharing
4. Advanced analytics
5. Integration with weather services

---

## Definition of Done

### For Each User Story:
- [ ] Code is written and tested
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Code is reviewed
- [ ] UI is responsive and accessible
- [ ] Database migrations are created
- [ ] API documentation is updated
- [ ] Security considerations are addressed

### For Each Sprint:
- [ ] All user stories are completed
- [ ] No critical bugs remain
- [ ] Performance is acceptable
- [ ] Security review is completed
- [ ] User acceptance testing is passed
- [ ] Deployment to staging is successful

---

## Risk Mitigation

### Technical Risks:
- **Database Performance**: Use proper indexing and query optimization
- **Authentication Security**: Implement proper security measures
- **UI/UX Complexity**: Keep MVP simple and focused
- **Cloud Infrastructure**: Test deployment early and often

### Resource Risks:
- **Developer Availability**: Plan for 20% buffer in timeline
- **Design Dependencies**: Ensure designer availability for UI tasks
- **Infrastructure Issues**: Have backup cloud provider ready

### Quality Risks:
- **Code Quality**: Implement code reviews and testing
- **User Experience**: Conduct regular usability testing
- **Performance**: Monitor and optimize throughout development

---

## Sprint Ceremonies

### Sprint Planning (2 hours)
- Review product backlog
- Select user stories for sprint
- Break down stories into tasks
- Estimate story points
- Plan sprint capacity

### Daily Standups (15 minutes)
- What did you complete yesterday?
- What will you work on today?
- Are there any blockers?

### Sprint Review (1 hour)
- Demo completed features
- Gather stakeholder feedback
- Update product backlog
- Plan next sprint priorities

### Sprint Retrospective (1 hour)
- What went well?
- What could be improved?
- Action items for next sprint
- Team process improvements

---

## Success Metrics

### Development Metrics:
- Sprint velocity (story points completed)
- Bug count and resolution time
- Code coverage percentage
- Deployment frequency

### User Experience Metrics:
- User registration completion rate
- Garden setup completion rate
- Feature usage statistics
- User feedback scores

### Business Metrics:
- Time to MVP completion
- Development cost tracking
- Infrastructure cost monitoring
- Team productivity metrics

---

## Tools and Technologies

### Development Tools:
- **Version Control**: Git with GitHub
- **Project Management**: Jira or Trello
- **Communication**: Slack or Discord
- **Documentation**: Confluence or Notion

### Development Stack:
- **Frontend**: React.js with TypeScript
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL (local Docker containers)
- **Cloud**: Hetzner Cloud or Scaleway (deployment only)
- **Authentication**: Google OAuth 2.0, Facebook OAuth 2.0
- **Local Development**: Docker containers for all services

### Testing Tools:
- **Unit Testing**: Jest
- **Integration Testing**: Supertest
- **E2E Testing**: Cypress
- **Code Quality**: ESLint, Prettier

This detailed Scrum plan provides a structured approach to developing the MVP while maintaining flexibility and ensuring quality delivery.
