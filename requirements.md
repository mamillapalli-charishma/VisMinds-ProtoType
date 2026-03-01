# Project Requirements: VisMinds - AI Creative Suite

## 1. Project Overview
VisMinds is an AI-powered platform designed to assist content creators, entrepreneurs, and strategists. It provides a suite of tools to generate ideas, plan content, and simulate advisory board discussions to overcome creative blocks and strategic isolation.

## 2. Functional Requirements

### 2.1. Creative Assistant
- **Goal**: Help users overcome writer's block and generate content ideas.
- **Features**:
    -   Input prompts for open-ended generation.
    -   Select specific content formats (e.g., Blog Post, Tweet, LinkedIn Article).
    -   View generated content in a clean, copyable format.

### 2.2. Content Strategist
- **Goal**: Plan and organize content calendars.
- **Features**:
    -   Generate weekly or monthly content plans based on niche and audience.
    -   Visual calendar view (future implementation).
    -   Export content plans.

### 2.3. Insights
- **Goal**: Provide data-driven feedback on content performance (simulated).
- **Features**:
    -   Visual graphs and charts showing engagement trends.
    -   Platform-specific performance metrics.
    -   Audience demographic breakdown.

### 2.4. "The Council" (AI Advisory Board)
- **Goal**: Simulate a diverse board of advisors to critique and refine user ideas.
- **Features**:
    -   **Persona Selection**: Users can select up to 3 distinct AI personas (e.g., The Visionary, The Skeptic, The Strategist).
    -   **Topic Submission**: Users input a strategic question or business idea.
    -   **Simulated Debate**: The system generates a multi-turn dialogue where personas discuss the topic from their unique perspectives.
    -   **Meeting Minutes**: The output is presented as a structured script or "minutes" of the meeting.

## 3. Non-Functional Requirements
-   **Performance**: AI responses should be generated within reasonable timeframes (under 30s). Loading states must be clearly visible.
-   **UX/UI**: The interface should be "premium," "vibrant," and modern, using glassmorphism and smooth transitions (Framer Motion).
-   **Reliability**: The system should gracefully handle API failures (e.g., OpenRouter timeout) and provide meaningful error messages.
-   **Scalability**: The backend structure should support adding new AI models or personas easily.

## 4. Technical Constraints
-   **Frontend**: React, Vite, TailwindCSS, Framer Motion.
-   **Backend**: Node.js, Express.
-   **AI Provider**: OpenRouter API (Access to models like Mistral 7B, etc.).
