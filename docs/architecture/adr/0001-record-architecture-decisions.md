# ADR 0001: Record Architecture Decisions

**Date:** 2026-05-20  
**Status:** Accepted  
**Deciders:** Joseph Searle

## Context

When making significant architectural decisions, there needs to be a way to document what was decided, why, and what the trade-offs are. Without this, future maintainers must reverse-engineer intent from code, repeat discussions that have already been resolved, and cannot understand the constraints that shaped the current design.

The six original decisions for this project were documented in `docs/decisions/` in an informal format. Migrating them to the standard ADR format in `docs/architecture/adr/` provides a consistent, numbered, cross-linked record.

## Decision

We use Architecture Decision Records (ADRs), as described by Michael Nygard, to document all significant architectural decisions. ADRs are stored in `docs/architecture/adr/`, numbered sequentially with four-digit zero-padded identifiers, and kept in the repository alongside the code they describe.

## Rationale

ADRs are lightweight (one Markdown file per decision), version-controlled, discoverable by engineers (same repo as the code), and create an immutable historical record. Alternatives considered: wiki pages (not version-controlled with the code), comments in code (not structured, hard to discover), verbal agreement (lost when team members leave).

## Consequences

### Positive

- Architectural decisions are discoverable without asking the original author
- New contributors can understand why the system is built the way it is
- Decisions are immutable — accepted ADRs are superseded, not edited
- Cross-referencing between ADRs and documentation sections is possible via relative links

### Negative

- Requires discipline to write an ADR for every significant decision
- Must agree on what counts as "significant" (use the reversibility test: the harder to reverse, the more it deserves an ADR)

### Neutral / Risks

- ADRs describe intent at decision time — reality may diverge; validate during architectural reviews

## Related Decisions

- Supersedes: (none)
- Superseded by: (none)
