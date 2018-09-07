<template>
    <div class="box">
        <div class="box-header">
            <i class="ion ion-clipboard"></i>
            <h3 class="box-title">{{ tasklist.name }}</h3>
            <div class="box-tools">
                <a href="#"><i class="fa fa-times"></i></a>
                <a href="#"><i class="fa fa-pencil"></i></a>
            </div>
        </div>

        <div class="box-body">
            <ul class="todo-list" v-if="tasklist.tasks.length">
                <li v-for="task in tasks" v-bind:class="{'task-finished': task.done, 'task-danger': task.overdue && !task.done}">
                    <input type="checkbox" @click="toggleStatus(task)" :checked="task.done != null" />
                    <span class="text">{{ task.task }}</span>
                    <div class="tools">
                        <a @click="edit(task)"><i class="fa fa-pencil"></i></a>
                        <a @click="remove(task)"><i class="fa fa-trash"></i></a>
                    </div>
                    <div class="right">
                        <small class="label label-default"><i class="fa fa-clock-o"></i> {{ task.due_date }}</small>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tasks: [],
            }
        },

        props: [
            'tasklist',
        ],

        mounted() {
            this.getTasks();
        },

        activated() {
            this.getTasks();
        },

        methods: {
            getTasks() {
                axios.get('/api/projects/' + this.tasklist.project.slug + '/lists/' + this.tasklist.id + '/tasks')
                    .then(response => {
                        this.tasks = response.data.tasks;
                    });
            },

            toggleStatus(task) {
                axios.post('/api/projects/' + this.tasklist.project.slug + '/lists/' + task.list_id + '/tasks/' + task.id + '/toggle')
                    .then(response => {
                        this.getTasks();
                    });
            },

            edit(task) {
                this.$parent.editTask(task);
            },

            remove(task) {
                if(confirm('Weet je het zeker?')) {
                    this.$parent.deleteTask(task);
                }
            },
        }
    }
</script>