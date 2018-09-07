<template>
    <div class="row">
        <div class="col-6">
            <tasks-list
                v-for="(list, index) in tasklists"
                :key="list.id"
                :tasklist="list">
            </tasks-list>
        </div>
        <div class="col-6">
            <task-form
                :form="form"
                :task="this.task"
                :tasklists="this.tasklists"
                :users="this.users"
                :project-id="this.projectId"
                @saveTask="saveTask"
                @cancel="cancel">
            </task-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    title: "Nieuwe taak",
                    button: "Toevoegen"
                },
                tasklists: [],
                users: [],
                task: {},
                emptyTask: {
                    id: null,
                    tasklist_id: '',
                    task: '',
                    due_date: '',
                    weight: 3,
                    user_id: ''
                }
            }
        },

        props: [
            'projectId'
        ],

        mounted() {
            this.task = this.emptyTask;
            this.getTaskLists();
            this.getUsers();
        },

        methods: {
            getTaskLists() {
                this.tasklists = [
                    {
                        'id': 1,
                        'name': 'example task',
                        'tasks': []
                    }
                ];
            },

            editTask(task) {
                this.task = task;

                this.form = {
                    title: "Taak bewerken",
                    button: "Opslaan"
                }
            },

            saveTask(task) {
                return task.id != null ? this.update(task) : this.save(task);
            },

            save(task) {
                let listIndex = this.tasklists.findIndex(project => project.id === task.list_id);
                this.tasklists[listIndex].tasks.push(task);
                this.cancel();
            },

            update(task) {
                this.cancel();
            },

            deleteTask(task) {
                let listIndex = this.tasklists.findIndex(project => project.id === task.list_id);
                let taskIndex = this.tasklists[listIndex].tasks.indexOf(task);

                this.tasklists[listIndex].tasks.splice(taskIndex, 1);
            },

            getUsers() {
                this.users = [
                    {
                        'id': 1,
                        'name': 'henk',
                        'email': 'henk@gmail.com'
                    }
                ];
            },

            cancel() {
                console.log("test");
                this.task = this.emptyTask;
            }
        }
    }
</script>