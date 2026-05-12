# AI Workflow Note

During the development of DocFlow, AI tools were utilized to accelerate development while strictly adhering to engineering standards.

## How AI Was Used:

1. **Scaffolding and Boilerplate:**
   - Used AI to generate the initial FastAPI routing structure and SQLAlchemy models. This saved time on boilerplate and allowed me to focus on business logic.
   
2. **UI Component Generation (Tailwind CSS):**
   - Leveraged AI to draft complex Tailwind layouts (e.g., the TipTap menu bar and the Drag-and-Drop file upload zone). 
   - *Human oversight:* I manually refined the spacing, colors, and accessibility attributes to ensure a cohesive and polished user experience.

3. **Debugging and Troubleshooting:**
   - Used AI to quickly identify and fix strict linting errors (`react-hooks/exhaustive-deps`, `react-refresh`) to ensure a successful Vercel deployment without turning off essential rules blindly.

## AI Engineering Philosophy
I treated the AI as a collaborative peer programmer. I provided strict specifications (spec-first development) and reviewed all generated code for security (e.g., ensuring no SQL injection vulnerabilities in the search/share functions) and maintainability before integrating it into the main codebase.
