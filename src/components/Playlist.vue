<template>
  <v-treeview 
    open-all
    :items="playlist.data.children"
    :active=activeList
  >
    <template v-slot:prepend="{ item, open }">
      <v-icon v-if="item.type == 'node'">
        {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
      </v-icon>
      <v-icon v-else>
        mdi-filmstrip-box
      </v-icon>
    </template>
    <template v-slot:label="{ item }">
      <a v-if="item.type == 'leaf'" @click="activate(item.id)">{{ item.name }}</a>
      <span v-else>{{ item.name }}</span>
    </template>
  </v-treeview>
</template>

<script>
import statusService from '@/services/status';
import playlistService from '@/services/playlist';

  export default {
    name: 'Playlist',
    props: [
      'active'
    ],
    data: () => ({
      playlist: { data: [] }
    }),
    computed: {
      // Find the active item in the playlist by looping recursively to find the item with the "current" attribute
      // TODO: Propose a solution where this isn't necessary, it is incredibly dumb and inefficient
      activeList: function () {
        let filterResult = this.recursiveFilter(this.playlist.data, e => e.current == 'current')
        if (filterResult.length > 0) {
          return [ filterResult[0].id ];
        } else {
          return [];
        }
      }
    },
    async created() {
      this.playlist = await playlistService.get();
    },
    methods: {
      recursiveFilter(node, filter) {
        var result = [];
        if (node.children) {
          if (node.children.filter(filter).length > 0) {
            return node.children.filter(filter);
          } else {
            // Use for loop as JS foreach causes function nesting and other nasties
            for (var i = 0; i < node.children.length; i++) {
              let child = node.children[i];

              result = this.recursiveFilter(child, filter);

              if (result.length > 0) {
                return result;
              }
            }
          }
        }
        return result;
      },
      activate(id) {
        statusService.sendRequest({
          'command': 'pl_play',
          'id': id
        })
      }
    }
  }
</script>
