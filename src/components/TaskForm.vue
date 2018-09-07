<template>
    <div class="content-wrap">
        <h3>{{ form.title }}</h3>
        <input type="hidden" v-model="task.id" />

        <div class="form-row">
            <div class="form-group col">
                <input v-model="task.task" type="text" class="form-control" name="task" id="task" placeholder="Taak" />
            </div>
        </div>

        <div class="form-row">
            <div class="form-group col">
                <input v-model="task.due_date" type="text" name="due_date" id="due_date" class="form-control datepicker" placeholder="Deadline" />
                <input id="due_date_hidden" type="hidden" />
            </div>
        </div>

        <div class="form-row">
            <div class="form-group col">
                <select v-model="task.user_id" class="selectpicker show-tick" data-style="btn-default" id="user_id" name="user_id">
                    <option value="" disabled="disabled">Geen verantwoordelijke</option>
                    <option v-for="user in users"
                            :value="user.id">{{ user.name }} <{{ user.email }}></option>
                </select>
            </div>
        </div>

        <div class="form-row">
            <div class="form-group col">
                <select v-model="task.list_id" class="selectpicker show-tick" data-style="btn-default" id="list_id" name="list_id">
                    <option value="">Takenlijst</option>
                    <option v-for="list in tasklists"
                            :value="list.id">{{ list.name }}</option>
                </select>
            </div>
        </div>

        <div class="form-row">
            <div class="form-group col">
                <select v-model="task.weight" class="selectpicker show-tick" data-style="btn-default" id="weight" name="weight">
                    <option value="1" :selected="task.weight == 1">Hele kleine taak</option>
                    <option value="2" :selected="task.weight == 2">Kleine taak</option>
                    <option value="3" :selected="task.weight == 3">Normale taak</option>
                    <option value="4" :selected="task.weight == 4">Grote taak</option>
                    <option value="5" :selected="task.weight == 5">Hele grote taak</option>
                </select>
            </div>
        </div>

        <div class="button-wrap">
            <div class="row">
                <div class="col">
                    <button v-if="task.id != null" class="btn btn-danger right" @click="cancel()">Annuleren</button>
                    <button class="btn btn-success right" @click="save()">{{ form.button }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },

        props: [
            'form',
            'task',
            'tasklists',
            'users',
            'projectId',
        ],

        mounted() {

            this.task.due_date = jQuery('#due_date_hidden').val();
        },

        updated() {
            setTimeout(function() {
                jQuery('.selectpicker').selectpicker('refresh');
            }, 500);
        },

        methods: {
            save() {
                this.task.due_date = jQuery('#due_date_hidden').val();
                this.$emit('saveTask', this.task);
                // this.task = this.emptyTask;
            },

            cancel() {
                this.$emit('cancel');
            }
        }
    }
</script>