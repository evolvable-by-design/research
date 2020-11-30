# Evaluation on a Case Study

> This README is an extract from our publication "Evolvable-by-design Web UI clients of REST APIs"

## Introduction

The evaluation performs a quantitative analysis. To do so, we use a benchmark that covers exhaustively all API evolutions.  
This benchmark is built to answer the following two research questions:

**[RQ1] Can a user interface autonomously adapt to all evolutions of a REST API that complies with the approach, without changing its code, at run-time?**

This aims to investigate the applicability and feasibility of our approach. It also evaluates its robustness w.r.t. REST API evolutions, in particular breaking evolutions.

**[RQ2] Does the implementation of an \textit{evolvable-by-design} Web UI require additional development effort?**

This aims to investigate the trade-off of our approach in terms of development effort of user interfaces.

## Data set

To evaluate the approach, we needed a web application composed of a Web UI and a REST API that implemented all sorts of evolutions from [the table listing the types API evolutions](/images/api-evolutions.png), at least once. Unfortunately, we could not find such kind of open-source project and our industrial partner could not provide one for privacy reasons.

![api evolutions table](/images/api-evolutions.png)

We developed a realistic web application imitating the project management software [Jira](https://www.atlassian.com/software/jira). With this application, multiple users collaborate on projects. A user can create public or private projects, invite other users to collaborate on the project, archive, delete or add tasks to it. The tasks have several operations and well-defined state transitions: they must be archived to be removable and only the tasks in a certain state can be completed, which can be customized by the users.

![Screenshot of the application displaying the details of a task.](/images/app-screenshot.png)

Screenshot of the application displaying the details of a task.

To implement this application, **we developed three software components: (1) a REST API that exposes up to 28 operations and implements 110 evolutions split in 16 versions, (2) an _evolvable-by-design_ UI and (3) a state-of-the-practice UI where the contract with the API is hard coded. We developed both UIs to be identical from the user perspective.** To demonstrate that the approach is feasible with modern technologies, the UIs are implemented in JavaScript with the React framework. The API server uses NodeJS and the documentation follows the OpenAPI Specification 3.0.0 that we extended to support OWL semantic annotations. Contextual documentation elements are transferred with hypermedia controls in the response body, using a custom format.

In order to ensure the reproducibility and transparency of this research, the three artifacts along with the documentation of all evolutions are publicly available online on GitHub ([evolutions](https://bit.ly/2UUpvGP) - [clients](https://bit.ly/3c1kwcX) - [server](https://bit.ly/2XipgqA). Thus, the development history of each artifact and evolution can be observed in detail.

Also, the code of the _evolvable-by-design_ UI includes a _library_ folder that contains all the code interpreting the documentation of the API at run-time, which aims to meet the _evolvable-by-design_ property. We later extracted this code in an open source library that we named [Pivo and uploaded to NPM](https://www.npmjs.com/package/@evolvable-by-design/pivo). Therefore, developers or scientists can handily reproduce the experiment or create their own.

## Experimental Protocol

Here, we describe the experimental protocol used to evaluate the approach w.r.t. the research questions.

To test at least one variant of all kinds of evolutions listed in the taxonomy presented in the table listing the API evolutions, we implemented 110 evolutions of the API, including 59 breaking evolutions and distributed them into 16 versions of the API. For example, 5 and 17 were respectively applied 9 and 3 times.

For each upgrade of the API, we manually evolve the code of the "traditional UI" to implement the evolutions. On the _evolvable-by-design_ UI, we refresh the page and manually verify that all evolutions were automatically integrated while not introducing bugs. Otherwise, we update the code.

Therefore, for each upgrade of the API, we count:

* the evolutions that are automatically supported by the UIs without causing bugs: by manually testing each feature of the interface.
* the lines of code that are changed to support breaking evolutions: by summing up the difference between additions and deletions of each commit related to this topic.
* the lines of code that are changed to support non-breaking evolutions: by summing up the difference between additions and deletions of each commit related to this topics.

All the code of the traditional UI is included. On the _evolvable-by-design_ UI, Pivo is the only component that is excluded because it is a generic library that is reused among projects.

## Observed results

The next table summarizes the observed results of the evaluation, and more details are given in the following Table.

![summary of the results of the evaluation](/images/overall-results.png)

![detailed results of the evaluation](/images/detailed-results.png)

**[RQ1] Can a UI autonomously adapt to all evolutions of a REST API that complies with the approach, without changing its code, at run-time?**

We observe that **the evolvable-by-design UI** can evolve itself to 57 out of the 59 breaking evolutions that are tested, which **addresses 27 out of the 29 (93%)** evolutions of the table listing the API evolutions. On the other hand, 43 out of the 51 non-breaking evolutions are also addressed **while the traditional UI is unable to evolve to any breaking or non-breaking evolution**.

The two breaking evolutions that the UI is not able to address with the documentation are the combination and the split of methods. It confirms the limitations set out in the Approach section of our paper.

On the other hand, among the non-breaking evolutions, the only kind of evolutions that the UI is not able to evolve to is the addition of methods and data. Because this is not related to the maintenance of an existing collaboration between the UI and the server, this property was not expected. Yet, for this very specific case, the UI can use the documentation to generate UI elements necessary to automatically integrate the new features. However, a designer will always have to refine the design to smoothly integrate them in the UI.

> From this research question we learn that **this semantic-based approach enables the automatic evolution of the UI, at run-time, to all evolutions that does not impact the semantics of the API**, which include 27 out of the 29 kinds of evolutions. Unfortunately, the combination and split of methods cannot be managed by this approach. Nonetheless, it still outperforms the traditional UI that did not evolve to any of the 29 kinds of evolutions, and hence, required manual adaptation.

**[RQ2] Does the implementation of an evolvable-by-design Web UI require additional development efforts?**

First, we observe in Table~\ref{table:evaluation-detailed-results} that the first implementation of the _evolvable-by-design_ UI required less code than the traditional version (1395 vs 1623). Yet, we argue that the development effort is similar. 
Indeed, the higher level of abstraction needed to implement the _evolvable-by-design_ version requires more cognitive effort than a copy of the contract into the code.

Then, every evolution of the API required to update the traditional UI. On the other hand, on the _evolvable-by-design_ UI, the code had to be updated only for the two unsupported breaking evolutions. In the end, 7 lines of code were updated on the _evolvable-by-design_ UI and 230 on the traditional UI.

Regarding the integration of the new features of the API, we observe that they require more lines of code for the traditional UI than for the _evolvable-by-design_ UI (190 vs 91).

We justify these results for three reasons: (1) the _evolvable-by-design_ UI generates the form for the operations from small components (e.g. the email input field) and hence maximize abstraction and reuse while the other UI implements one component per operation. Also, it (2) validates the input from a generic code leveraging the data constraint language instead of implementing this logic for each input, and (3) it does not implement the access logic neither the conditions determining the availability of the operations.

> As a result, from this research question we learn that, **the first implementation of an _evolvable-by-design_ UI is equivalent to a traditional UI. However, for the fewer code to write, its implementation requires anticipating unforeseen evolutions, which demands additional cognitive effort and developing new skills.** Yet, from these results we argue that the development of an _evolvable-by-design_ UI greatly reduces the effort to evolve the UI for the next versions of the API. Thus, we observe that the overall development effort is greatly reduced in the long term.
