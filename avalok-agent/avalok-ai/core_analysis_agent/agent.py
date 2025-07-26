from google.adk.agents import ParallelAgent, LlmAgent
from .subagents.incident_agent import root_agent as incident_agent
from .subagents.sentiment_agent import root_agent as sentiment_agent
from .subagents.coverage_agent import root_agent as coverage_agent

root_agent = ParallelAgent(
    name="core_analysis_agent",
    sub_agents=[incident_agent, sentiment_agent, coverage_agent],
    description="Run Incident, Sentiment, and Blind-Spot Dispatch analysis in parallel on each clip",
)