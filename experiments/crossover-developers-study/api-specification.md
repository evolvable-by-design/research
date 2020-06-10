# Api Specification

In this file we describe the API that will have to be used by the frontend that the developers participating in the study will develop. This API has a first version that all developers will implement, and will then evolve. One new version of the API is created per [type of REST API evolution](../resources/api-evolutions-list.md).

The API is designed to enable the implementation of a variant of [TODO MVC](http://todomvc.com/) that uses a REST API to persist the data.

## Initial API

```
GET /todos?status where Task = { title, status } and where the default value of status is "all" -> list the todos (title can be an empty string)
POST /todo with body { title } -> create a new todo
PUT /todo/{todoId} with body { title, status } -> modify a todo
DELETE /todo/{todoId} -> delete a todo
DELETE todos?status="active | completed | all" -> delete the todos with the given status
```

## Changes to the API

| Index | Type of evolution                                           | Actual Evolution on the API                                                                                               | Breaking clients? |
| ----- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| 1     | Add or Remove Parameter                                     | Add a `due_date` parameter to PUT /todo/{todoId}                                                                          | Yes               |
| 2     | Change Type of Parameter                                    | Move the `due_date` parameter inside an object named `nested`                                                             | Yes               |
| 3     | Change Type of Return Value                                 | Move `status` of Task inside a `details` object                                                                           | Yes               |
| 4     | Delete Method                                               | Remove the DELETE method of the API                                                                                       | Yes               |
| 5     | Rename Method                                               | Rename GET /todos into GET /todo                                                                                          | Yes               |
| 6     | Rename Parameter                                            | Rename `title` into `text`                                                                                                | Yes               |
| 7     | Change Format of Parameter                                  | Change `status` into an integer in PUT /todo/{todoId}                                                                     | Yes               |
| 8     | Change Format of Return Value                               | Change `status` into an integer in the response of the GET                                                                | Yes               |
| 9     | Change XML Tag                                              | !! .......... NOT-TESTED, not relevant in a JSON-first world                                                              | Yes               |
| 10    | Combine Methods                                             | !! .......... TODO ..........                                                                                             | Yes               |
| 11    | Split Method                                                | Remove `status` from PUT /todo/{todoId} and create the PUT /todo/{todoId}/complete and uncomplete operations              | Yes               |
| 12    | Expose Data                                                 | COULD NOT UNDERSTAND THE POINT                                                                                            | Yes               |
| 13    | Unsupport Request Method                                    | Remove the PUT /todo/{todoId} operation                                                                                   | Yes               |
| 14    | Change Default Value of Parameter                           | For operation GET /todos change the default value of `status` to `active`                                                 | No                |
| 15    | Change Upper Bound of Parameter                             | The maximum value for due_date is now currentTimestamp + 1000000000 instead of currentTimestamp + 100000000000            | No                |
| 16    | Restrict Access to API                                      | An API Key with deletion autorisation must be provided to allow the deletion of todos                                     | No                |
| 17    | Move API elements                                           | !! .......... TODO ..........                                                                                             | Yes               |
| 18    | Rename API elements                                         | Rename the status active into todo                                                                                        | Yes               |
| 19    | Behavior change                                             | The creation of a task with an empty string as the title is no longer accepted                                            | No                |
| 20    | Post condition change                                       | !! .......... TODO ..........                                                                                             | No                |
| 21    | HTTP header change                                          | Add headers to paginate the list of todos, use X-TODOMVC-Total for the page length and X-TODOMVC-Page for the page number | Yes               |
| 22    | Error condition change                                      | !! ..........TODO .......... -> pendant implem utiliser des codes spécifiques d'erreur et en modifier un                  | No                |
| 23    | Request Method change (e.g. POST, PUT, etc.)                | Change PUT /todo/{todoId} into POST /todo/{todoId}                                                                        | Yes               |
| 24    | Precondition change                                         | A todo must now be completed before being deletable                                                                       | No                |
| 25    | Order of operations to achieve a business process changed   | !! ..........TODO ..........                                                                                              | No                |
| 26    | The set of operations to achieve a business process changed | To delete a todo, first complete it and then run delete, before it was possible to delete right away                      | No                |
| 27    | Change input parameter constraints                          | The `title` parameter must now be between 8 and 200 characters long and contain letters only                              | No                |
