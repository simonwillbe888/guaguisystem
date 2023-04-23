<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];

    // if (icon) {
    //   vnodes.push(<svg-icon icon-class={icon}/>)
    // }

    if (title) {
      // console.log("查看title",title)
      if( title !== '系统监控'){
        vnodes.push(<span slot="title">{title}</span>);
      }
      else{
        vnodes.push(<span slot="title">{hidden}</span>)
      } //系统信息处不显示次级导航栏
     
    }
    return vnodes;
  },
};
</script>
