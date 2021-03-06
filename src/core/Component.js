// import 'element-closest-polyfill';
export default class Component {
    $target;
    $props;
    $state;
    constructor($target, $props) {
        this.$target = $target;
        this.$props = $props;
        this.setup();
        this.setEvent();
        this.render();
    }
    setup() {}
    mounted() {}
    template() {
        return '';
    }
    render() {
        this.$target.innerHTML = this.template();
        this.mounted();
        this.didMounted();
    }
    didMounted() {}
    setEvent() {}
    setState(newState) {
        this.$state = { ...this.$state, ...newState };
        this.render();
    }
    addEvent(eventType, selector, callback) {
        const children = [...this.$target.querySelectorAll(selector)];
        const isTarget = (target) => {
            return (
                children.includes(target) /* 셀렉터에 포함되어 있거나*/ ||
                target.closest(selector)
            ); // 조상중에 있으면 TRUE
        };

        // console.log(this.$target);

        this.$target.addEventListener(eventType, (event) => {
            if (!isTarget(event.target)) return false;
            // console.log(children);
            callback(event);
        });
    }
}
