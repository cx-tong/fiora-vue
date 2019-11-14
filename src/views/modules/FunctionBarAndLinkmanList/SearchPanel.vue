<template>
  <div class="mainPanel" @click.stop="">
    <div class="tabsNav">
      <div class="tab"
      :class="tabName=='all'?'focus':''"
      @click="tabName='all'"
      >全部</div>
      <div class="tab"
      :class="tabName=='users'?'focus':''"
      @click="tabName='users'"
      >用户</div>
      <div class="tab"
      :class="tabName=='groups'?'focus':''"
      @click="tabName='groups'"
      >群组</div>
    </div>
    <div class="resultPanel">
      <div class="allResult" v-show="tabName === 'all'">
        <div v-if="searchResult.users.length !==0 || searchResult.groups.length !==0">
          <div v-if="searchResult.users.length !==0">
            <p>用户</p>
            <div class="resultItem"
            v-for="item in searchResult.users"
            :key="item._id"
            @click="userInfo=item;$refs.userResult.show()">
              <img class="avatar" :src="item.avatar"/>
              <p class="name">{{item.username}}</p>
            </div>
          </div>
          <div v-if="searchResult.groups.length !==0">
            <p>群组</p>
            <div class="resultItem"
            v-for="item in searchResult.groups"
            :key="item._id"
            @click="groupInfo=item;$refs.groupResult.show()">
              <img class="avatar" :src="item.avatar"/>
              <p class="name">{{item.members}}人</p>
              <p class="name">{{item.name}}</p>
            </div>
          </div>
        </div>
        <div v-else>无结果</div>
      </div>
      <div class="userResult" v-show="tabName === 'users'">
        <div v-if="searchResult.users.length !==0">
          <div class="resultItem" v-for="item in searchResult.users" :key="item._id">
            <img class="avatar" :src="item.avatar" />
            <p class="name">{{item.username}}</p>
          </div>
        </div>
        <div v-else>无结果</div>
      </div>
      <div class="groupsResult" v-show="tabName === 'groups'">
        <div v-if="searchResult.groups.length !==0">
          <div class="resultItem" v-for="item in searchResult.groups" :key="item._id">
            <img class="avatar" :src="item.avatar" />
            <p class="name">{{item.members}}人</p>
            <p class="name">{{item.name}}</p>
          </div>
        </div>
        <div v-else>无结果</div>
      </div>
    </div>
    <user-result ref="userResult" :userInfo="userInfo"></user-result>
    <group-result ref="groupResult" :groupInfo="groupInfo"></group-result>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import UserResult from './searchResult/usersResultDialog.vue';
import GroupResult from './searchResult/groupsResult.vue';

export default Vue.extend({
  components: {
    UserResult,
    GroupResult,
  },
  props: {
    searchKey: String,
  },
  data() {
    return {
      tabName: 'all',
      userInfo: {},
      groupInfo: {},
      searchResult: {
        users: [],
        groups: [],
      },
    };
  },
  methods: {
    clearResult() {
      this.searchResult = { users: [], groups: [] };
    },
    search() {
      this.$fetch('search', { keywords: this.searchKey })
        .then(([error, res]: [string, any]) => {
          if (!error) {
            this.searchResult = res;
          }
        });
    },
  },
});
</script>
<style lang="scss" scoped>
  .mainPanel {
    position: absolute;
    top: 60px;
    left: 8px;
    width: 276px;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    z-index: 1300;
    .tabsNav {
      display: flex;
      height: 50px;
      padding: 10px 10px;
      justify-content: space-around;
      .tab {
        cursor: pointer;
        width: 70px;
        text-align: center;
      }
      .focus {
        color: #108ee9;
        border-bottom: #108ee9 solid 2px;
      }
    }
    .resultPanel {
      .resultItem {
        display: flex;
        margin: 10px;
        padding: 10px;
        cursor: pointer;
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 20px;
        }
        .name {
          line-height: 40px;
          margin-left: 10px;
        }
      }
      .resultItem:hover {
        background-color: #eee;
      }
    }
  }
</style>
