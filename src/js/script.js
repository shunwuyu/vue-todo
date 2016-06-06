(function($) {
    // Array of Month
    var month = ["January", "February", "Mach", "April", "May", "June", "July", "August", "September", "October", "November", "September"];
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    var ListStore = {
        state: {
            items: [
                {
                    text: 'Sprint meeting',
                    status: 'undone',
                    label: 'urgent'
                },
                {
                    text: 'Have lunch with Evan You & Bill Gates',
                    status: 'done',
                    label: 'normal'
                }
            ]
        },
        newItem: function(text, status, label) {
            this.state.items.unshift({ text: text, status: status, label: label, isEditing: true });
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

    /**
     * Header component
     */
    var Header = Vue.extend({
        template: '#todo-header',
        data: function() {
            return {
                date: '',
                weekDay: '',
                month: ''
            }
        },
        ready: function() {
            var d = new Date();
            this.date = d.getDate();
            this.weekDay = weekday[d.getDay()];
            this.month = month[d.getMonth()];
        },
        methods: {
            add: function() {
                ListStore.newItem('Type a new task and hit enter', 'editing', 'urgent');
            }
        }
    });

    /**
     * Item component
     */
    var TodoItem = Vue.extend({
        template: '#todo-item',
        props: ['model']
    });


    /**
     * List component
     */
    var TodoList = Vue.extend({
        template: '#todo-list',
        props: ['collection'],
        components: {
            'todo-item': TodoItem
        }
    });

    var todo = new Vue({
        el: '#app',
        data: function() {
            return {
                listState: ListStore.state
            }
        },
        components: {
            'todo-header': Header,
            'todo-list': TodoList
        }
    })
})(jQuery);