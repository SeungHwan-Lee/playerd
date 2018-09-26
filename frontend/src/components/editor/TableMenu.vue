<template>
  <ul class="menu">
    <li v-for="menu in menus" :key="menu.id" @click="menuAction(menu.type)">
      <span>{{ menu.icon }}</span>
      <span>{{ menu.name }}</span>
      <span>{{ menu.keymap }}</span>
    </li>
  </ul>
</template>

<script>
  import event from '@/js/Event'
  import storeERD from '@/store/erd'

  export default {
    name: 'TableMenu',
    data() {
      return {
        menus: [
          {
            type: 'pk_active',
            icon: '',
            name: 'PK 컬럼으로 지정',
            keymap: ''
          }
        ]
      }
    },
    methods: {
      // menu 동작
      menuAction(type) {
        switch (type) {
          case 'pk_active':
            storeERD.commit({
              type: 'columnKey',
              key: 'pk'
            })
            break
        }
      }
    },
    mounted() {
      // 오른쪽 클릭 이벤트 등록
      event.addRightClick(function (e) {
        const $el = $(this)
        $el.css({
          top: `${e.clientY}px`,
          left: `${e.clientX}px`
        })
        $el.show()
      }.bind(this.$el))
      // 메뉴 hide
      $(document).on('mousedown', function (e) {
        const $el = $(this)
        let offset = $el.offset()
        offset.width = $el.width()
        offset.height = $el.height()

        if (!(offset.top <= e.clientY
          && e.clientY <= offset.top + offset.height
          && offset.left <= e.clientX
          && e.clientX <= offset.left + offset.width)) {
          $el.hide()
        }
      }.bind(this.$el))
    }
  }
</script>

<style lang="scss" scoped>
  $mbg: #191919;
  .menu {
    color: #a2a2a2;
    background-color: $mbg;
    position: fixed;
    opacity: 0.9;
    display: none;

    li {
      width: 100%;
      height: 100%;
      padding: 15px;
      cursor: pointer;

      &:hover {
        color: white;
        background-color: #383d41;
      }
    }

  }
</style>
