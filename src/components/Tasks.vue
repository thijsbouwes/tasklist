<template>
    <div class="row">
        <div class="col-6">
            <task-lists-component v-for="(list, index) in tasklists" :key="list.id" :tasklist="list"></task-lists-component>
        </div>
        <div class="col-6">
            <task-form-component :form="form" :task="this.task" :tasklists="this.tasklists" :users="this.users" :project-id="this.projectId"></task-form-component>
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
                axios.get('/api/projects/' + this.projectId + '/lists')
                    .then(response => {
                        this.tasklists = response.data.tasklists;
                    });
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
                axios.post('/api/projects/' + this.projectId + '/lists/' + task.list_id + '/tasks', task)
                    .then(response => {
                        this.getTaskLists();
                        this.task.task = '';
                    });
            },

            update(task) {
                axios.put('/api/projects/' + this.projectId + '/lists/' + task.list_id + '/tasks/' + task.id, task)
                    .then(response => {
                        this.getTaskLists();
                        this.cancelEdit();
                    });
            },

            deleteTask(task) {
                axios.delete('/api/projects/' + this.projectId + '/lists/' + task.list_id + '/tasks/' + task.id, task)
                    .then(response => {
                        this.getTaskLists();
                    });
            },

            cancelEdit() {
                this.task = this.emptyTask;
                this.form = {
                    title: "Nieuwe taak",
                    button: "Toevoegen"
                }
            },

            getUsers() {
                axios.get('/api/users')
                    .then(response => {
                        this.users = response.data.users;
                    });

            }
        }
    }
</script>