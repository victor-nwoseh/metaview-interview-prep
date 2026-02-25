from pydantic import BaseModel, field_validator


class PrepRequest(BaseModel):
    job_description: str
    candidate_cv: str

    @field_validator("job_description", "candidate_cv")
    @classmethod
    def must_not_be_empty(cls, v: str, info) -> str:
        if not v or not v.strip():
            raise ValueError(f"{info.field_name} must not be empty")
        return v.strip()


class PrepBrief(BaseModel):
    """
    Represents the structured output of the interview prep agent.
    In practice the brief is streamed as raw markdown, so this model
    serves as documentation of the expected sections and as a schema
    for any future structured-output path.
    """
    competency_map: str = ""
    questions: str = ""
    evaluation_criteria: str = ""
    gaps: str = ""
    interview_flow: str = ""
