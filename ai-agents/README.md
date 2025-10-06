# AI Agents for Gardening App Development

## Overview
This directory contains the role definitions and context-setting prompts for AI agents working on the Phase 1 development of the gardening app for Northern European hobbyists.

## Agent Structure

### Core Development Agents
1. **[Full-Stack Developer](01-fullstack-developer.md)** - Primary technical implementation
2. **[UI/UX Designer](02-ui-ux-designer.md)** - User experience and interface design
3. **[Database & Backend Architect](03-database-backend-architect.md)** - Data layer and API design
4. **[Plant Database Specialist](04-plant-database-specialist.md)** - Botanical knowledge and plant data
5. **[DevOps & Cloud Infrastructure](05-devops-cloud-infrastructure.md)** - Infrastructure and deployment

### Support Agents
6. **[Quality Assurance](06-quality-assurance.md)** - Testing and quality assurance
7. **[Product Management](07-product-management.md)** - Product strategy and coordination

## Agent Coordination Strategy

### Daily Standup Coordination
- All agents participate in daily standups
- Share progress, blockers, and dependencies
- Coordinate handoffs between agents
- Ensure sprint goals are on track

### Sprint Planning Coordination
- Product Management Agent leads sprint planning
- All agents contribute to story estimation
- Dependencies and handoffs are identified
- Sprint capacity and velocity are tracked

### Cross-Agent Collaboration
- **Full-Stack + UI/UX**: Frontend development
- **Database + Backend**: Data layer implementation
- **Plant Database Specialist**: Provides data to all agents
- **DevOps**: Supports all technical agents
- **QA**: Validates all deliverables
- **Product Management**: Coordinates all agents

### Quality Gates
- Each agent has specific quality criteria
- Cross-agent validation for integrated features
- User acceptance testing coordination
- Performance and security validation

## Implementation Recommendations

### Agent Deployment Strategy
1. **Start with Core Agents**: Begin with Full-Stack, UI/UX, and Database agents
2. **Add Specialized Agents**: Introduce Plant Database and DevOps agents in Sprint 2
3. **Scale with QA and Product Management**: Add remaining agents as complexity increases

### Communication Protocols
- **Daily Standups**: 15-minute coordination sessions
- **Sprint Planning**: Comprehensive planning with all agents
- **Code Reviews**: Cross-agent validation of deliverables
- **User Testing**: Coordinated testing and feedback integration

### Success Metrics
- **Sprint Velocity**: Track story points completed per sprint
- **Quality Metrics**: Bug count, test coverage, performance
- **User Experience**: Usability testing and feedback scores
- **Technical Debt**: Code quality and maintainability metrics

## Usage Instructions

### For Each Agent
1. Read the agent's role definition and context-setting prompt
2. Understand the agent's responsibilities and key skills
3. Review the sprint focus areas and considerations
4. Use the context-setting prompt when initializing the agent
5. Coordinate with other agents as specified in the collaboration strategy

### Context-Setting Prompts
Each agent file contains a comprehensive context-setting prompt that should be used when initializing the agent. These prompts include:
- Role and expertise definition
- Project context and requirements
- Technical stack and focus areas
- Key considerations and principles
- Target users and platform requirements

### Agent Coordination
- Follow the coordination strategy outlined in this README
- Participate in daily standups and sprint planning
- Coordinate handoffs and dependencies
- Validate deliverables across agent boundaries
- Maintain quality standards and user experience focus
