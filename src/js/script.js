(function($) {
  var month = ["January", "February", "Mach", "April", "May", "June", "July", "August", "September", "October", "November", "September"];
  var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  var ListStore = {
      state: {
          items: []
      },
      newItem: function(text, status, label) {
          this.state.items.unshift({ text: text, status: status, label: label, isEditing: true });
          // console.log(this.state.items);
      },
      load: function() {
          var dataString = window.localStorage.getItem('todo-list');
          if(dataString) {
              this.state.items = JSON.parse(dataString);
          }
          return true;
      },
      push: function() {
          window.localStorage.setItem('todo-list', JSON.stringify(this.state.items));
      }
  }

  var TodoItem = Vue.extend({
    template: '#todo-item',
    data: function() {
      return {
        tempText: ''
      }
    },
    computed() {
      isDone: function() {
          return this.model.status == "done" ? true : false;
      }
    }
  })

  var Report = Vue.extend({
      template: '#todo-report',
      data: function() {
          return {
              listState: ListStore.state
          }
      },
      computed: {
          taskDone: function() {
              var total = 0;
              if(this.listState.items.length > 0) {
                  for(var i = 0; i < this.listState.items.length; i++) {
                       if(this.listState.items[i].status == "done") {
                           total++;
                       }
                  }
              }
              return total;
          },
          taskTotal: function() {
              return this.listState.items.length;
          }
      }
  });

  var Header = Vue.extend({
      template: '#todo-header',
      data: function() {
          return {
              date: '',
              weekDay: '',
              month: '',
              year: ''
          }
      },
      created: function() {
          var d = new Date();
          this.date = d.getDate();
          this.weekDay = weekday[d.getDay()];
          this.month = month[d.getMonth()];
          this.year = d.getFullYear();
      },
      methods: {
          add: function(event) {
              ListStore.newItem('Type a new task and hit enter', 'undone', 'normal');
          }
      }
  });

  var todo = new Vue({
      el: '#app',
      data: function() {
          return {
            listState: ListStore.state
          }
      },
      created: function() {
        ListStore.load();
      },
      mounted: function() {
        window.addEventListener('click', this.hideAction);
      },
      methods: {
          /* Hide task action */
          hideAction: function() {
              $('.action-popup').removeClass('show');
          }
      },
      components: {
        'todo-header': Header,
        'todo-report': Report,
        'todo-list': TodoList
      }
  })
})(jQuery)
