# Phase III: Todo AI Chatbot Spec

## Objective
Create an AI-powered todo chatbot using FastAPI, OpenAI Agents SDK, MCP server, SQLModel, PostgreSQL, and ChatKit.

## Requirements
- Conversational todo management
- Agents call MCP tools for CRUD operations
- Stateless FastAPI server
- DB store tasks + message history
- MCP tools stateless but persist to DB
- Friendly confirmations
- Error handling

## Tech Stack
- FastAPI (Backend)
- OpenAI Agents SDK (AI Logic)
- Official MCP SDK (Tool Layer)
- ChatKit (Frontend)
- SQLModel (ORM)
- PostgreSQL (Neon)
- Better Auth (Login)

## MCP Tools
- add_task
- list_tasks
- complete_task
- delete_task
- update_task

## Models
Task(user_id, id, title, description, completed, created_at, updated_at)
Conversation(user_id, id, created_at, updated_at)
Message(user_id, id, conversation_id, role, content, created_at)

## Endpoint
POST /api/{user_id}/chat

## Behavior
- Natural language → tool calls
- Conversation history saved
- No server memory between requests