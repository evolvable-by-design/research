# [WIP] Developers Experimentation

**WARNING: this experiment has not been run yet, this is a work in progress**

> Crossover study, a variant of within-subject design in which all participants are exposed sequentially to all variances of the task

Example article implementing this method: http://www.jot.fm/issues/issue_2019_02/article10.pdf

## Objectives

- Compare the effort required, with and without the approach, to develop and maintain a frontend that uses an evolving API -> Unit? Time?
- Obtain an evaluation of the effort felt by the developer -> scale from 1 to 8?
- Would the developers consider using it on a new project? Why?
- Would the developers consider implementing it on an existing project? Why?
- Identify what are the biggest barriers to developers adopting the approach
- Strengths and interests of the approach? (as seen by the developers)

## Protocol

Duration: 4 hours
Minimum Developers Required: 18
Developers experience: sufficently experienced with React to be comfortable developing new React components and using higher-order components. An experience with the react hooks would be a plus.

### Organization and groups

- The developers are split into groups of at least 2 where each developer works individually
- Each developer have to implement the same frontend application with the traditional approach and with the evolvable-by-design approach. Within a group, half of the developers start with the traditional approach and the other half with the evolvable-by-design approach. The developer is assigned 2 hours for each approach.
- The frontend application to build consumes an evolving API. Each group is given the same API that has five versions: an initial one and four others introducing four types of REST API evolution. The developer will then have to implement a working version of the frontend for each version of the API, with the two aforementioned approaches.
- Each group will have to handle at least one evolution that is common with another group.
- The end goal is to test all types of evolutions.

## Artefacts

- [Pre-experiment questionnaire](./pre-experiment-questionnaire.md)
- [Post-experiment questionnaire](./post-experiment-questionnaire.md)
