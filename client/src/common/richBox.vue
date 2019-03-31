<template>
  <div>
    <div
      ref="richInput"
      contenteditable="true"
      class="rich-box"
      @keyup.enter="sendMsg"
      v-html="emoji(richText)"
      @input="handleMarkRange"
      @click="handleMarkRange"
    >dd</div>
    <div class="action">
      <Button class="btn-send" type="primary" @click="sendMsg">发送</Button>
    </div>
  </div>
 
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: ['emojiCode'],
  data() {
    return {
      richText: '',
      lastRange: '',
      cursorPosition: 0,
    }
  },
  methods: {
    sendMsg() {
      let msg = this.$refs.richInput.innerHTML
      this.$refs.richInput.innerHTML = ''
      if(!msg) return
      let date = new Date()
      
      let time = date.toTimeString().split(' ')[0]
      date = date.toLocaleDateString()
      let data = {
        content: {
          type: 'text',
          msg,
          sender: this.userInfo.id,
          receiver: this.roomInfo.chatId,
          date,
          time
        },
        roomId: this.roomInfo.roomId
      }
      this.$socket.emit('client_msg', data)
      this.senderMsgList(data)
    },
    handleMarkRange(e) {
      this.lastRange = getSelection().getRangeAt(0)

      var selection = getSelection()

      // console.log(selection.anchorNode.nodeName)
      // console.log(e.currentTarget.childNodes)

      // console.log(this.lastRange.startOffset)
      // console.log(this.lastRange.endOffset)
      // console.log(e.currentTarget.innerHTML)
      // console.log(typeof e.currentTarget.innerHTML)
      // console.log(JSON.stringify(e.currentTarget.innerHTML))
      // console.log(this.lastRange.startOffset)
      // this.cursorPosition = this.getCursorPosition(e.currentTarget)
    },
    // getCursorPosition(element) {
    //   let caretOffset = 0
    //   const doc = element.ownerDocument || element.document
    //   const win = doc.defaultView || doc.parentWindow
    //   const sel = win.getSelection()
    //   if (sel.rangeCount > 0) {
    //     const range = win.getSelection().getRangeAt(0)
    //     const preCaretRange = range.cloneRange()
    //     preCaretRange.selectNodeContents(element)
    //     preCaretRange.setEnd(range.endContainer, range.endOffset)
    //     caretOffset = preCaretRange.toString().length
    //   }
    //   return caretOffset
    // },
    // setCursorPosition(element, cursorPosition) {
    //   const range = document.createRange()
    //   range.setStart(element.firstChild, cursorPosition)
    //   range.setEnd(element.firstChild, cursorPosition)
    //   const sel = window.getSelection()
    //   sel.removeAllRanges()
    //   sel.addRange(range)
    // },
    ...mapMutations(['senderMsgList'])
  },
  watch: {
    emojiCode() {
      if(!this.emojiCode) return
      let richInput = this.$refs.richInput

      let start = this.lastRange.startOffset


      let emoji = this.emoji(this.emojiCode)
      // this.richText = richInput.innerHTML.slice(0, start) + emoji + richInput.innerHTML.slice(start)

      let oDiv = document.createElement('div')
      oDiv.innerHTML = emoji


      this.lastRange.insertNode(oDiv.firstChild)
      this.lastRange.collapse(false)

      // console.log(this.emoji(this.emojiCode))
      // this.lastRange.setStart(emojiStr, emojiStr.length)
      // this.richText = richInput.innerHTML + this.emojiCode
      

      
      // console.log(this.emojiCode)

      // let textNode = this.lastRange.startContainer
      // console.log(textNode)
      // textNode.insertData(start, this.emojiCode)
      // // console.log(textNode)

      // const range = document.createRange()
      // range.setStart(textNode, start+this.emojiCode.length)

      const sel = getSelection()
      sel.removeAllRanges()
      sel.addRange(this.lastRange)



      this.$emit('initCode')
      // richInput.focus()

      this.lastRange = getSelection().getRangeAt(0)
      // this.richText = 
      // let a = this.lastRange.startContainer.data
      // console.log(a)
      // console.log(typeof a.data)
      // console.log(this.lastRange)
      // this.richText = a

    }
  },
  computed: {
    ...mapState(['roomInfo', 'userInfo'])
  },
}
</script>

<style lang="less" scoped>
  .rich-box {
    height: 84px;
    width: 100%;
    margin-top: 10px;
    background-color: #eee;
    outline: none;
    border: none;
    resize: none;
    font-size: 15px;
    line-height: 25px;
    font-family: 'songti';
    overflow: hidden;
  }

  .action {
    height: 30px;
    position: relative;

    .btn-send {
      position: absolute;
      width: 80px;
      right: 0;
    }
  }
  
</style>

