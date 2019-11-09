interface User {
  _id: string, // {string} id
  username: string, // {string} 用户名
  avatar: string, // {string} 头像
  groups: Group[], // {[Group]} 群组列表
  friends: User[], // {[User]} 好友列表
  token: string, // {string} 免密登录token
  isAdmin: boolean, // {boolean} 是否为管理员
}
interface Group {
  _id: string, // {string} id
  name: string, // {string} 群组名
  avatar: string, // {string} 头像
  creator: User['_id'], // {User ID} 群主id
  isDefault: boolean, // {boolean} 是否为默认群
  members: User[], // {[User]} 成员列表
  messages: Message[], // {[Message]} 消息列表
}
interface Message {
  _id: string, // {string} id
  from: User, // {User} 发送者
  to: string, // {string} 群聊: 群id, 私聊: 两人id拼接, 按字符串比较, 小的在前
  type: string, // {string} 消息类型 ['text', 'image', 'code', 'invite']
  content: string, // {string} 消息内容
}
