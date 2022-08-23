import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
    // title: null,
    // description: null,
  }),

  actions: {

    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
      return this.tasks;
    },
    // to Add Tasks
    async addTask(title, description) {
      // console.log(useUserStore().user.id);
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
        },
      ]);
    },
    // To check complete or not task   NOT WORKIG STILL
    async checkTaskItem(id, check) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ is_complete: check })
        .match({ id: id });
    },
    // To Delete Tasks
    async deleteTaskItem(id) {
      const { data, error } = await supabase
        .from('tasks')
        .delete()
        .match({ id: id })
    },
    // To Edit the tasks
    async editTaskItem(id, title, description) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ title: title, description: description })
        .match({ id: id })
    },


  },
});
