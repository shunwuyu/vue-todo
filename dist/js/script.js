!function(t){var e=["January","February","Mach","April","May","June","July","August","September","October","November","September"],n=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],a={state:{items:[]},newItem:function(t,e,n){this.state.items.unshift({text:t,status:e,label:n,isEditing:!0})},load:function(){var t=window.localStorage.getItem("todo-list");return t&&(this.state.items=JSON.parse(t)),!0},push:function(){window.localStorage.setItem("todo-list",JSON.stringify(this.state.items))}},o=Vue.extend({template:"#todo-item",data:function(){return{tempText:""}}}),i=Vue.extend({template:"#todo-list",props:["collection"],components:{"todo-item":o}}),s=Vue.extend({template:"#todo-report",data:function(){return{listState:a.state}},computed:{taskDone:function(){var t=0;if(this.listState.items.length>0)for(var e=0;e<this.listState.items.length;e++)"done"==this.listState.items[e].status&&t++;return t},taskTotal:function(){return this.listState.items.length}}}),r=Vue.extend({template:"#todo-header",data:function(){return{date:"",weekDay:"",month:"",year:""}},created:function(){var t=new Date;this.date=t.getDate(),this.weekDay=n[t.getDay()],this.month=e[t.getMonth()],this.year=t.getFullYear()},methods:{add:function(t){a.newItem("Type a new task and hit enter","undone","normal")}}});new Vue({el:"#app",data:function(){return{listState:a.state}},created:function(){a.load()},mounted:function(){window.addEventListener("click",this.hideAction)},methods:{hideAction:function(){t(".action-popup").removeClass("show")}},components:{"todo-header":r,"todo-report":s,"todo-list":i}})}(jQuery);