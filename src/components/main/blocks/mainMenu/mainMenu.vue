<script setup>
  import { ChevronDown, ChevronUp } from "lucide-vue-next"
  import { ref, reactive } from "vue"
  import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue"
  import { useRouter } from "vue-router"

  import manifestData from "../../manifests/mainMenu.json"

  const menuJSON = ref(manifestData)
  const menu = reactive(
    Object.entries(manifestData.menu.items).map(([key, value]) => ({
      ...value,
      id: key,
    })),
  )

  const router = useRouter()

  const navigate = (url) => {
    router.push(url)
  }
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div v-for="item in menu" :key="item.id">
      <Popover v-if="item.dropdown" class="relative">
        <PopoverButton as="a" class="cursor-pointer">
          <template v-slot="{ open }">
            {{ item.name }}
            <ChevronDown v-if="!open" class="w-4 h-4" />
            <ChevronUp v-else class="w-4 h-4" />
          </template>
        </PopoverButton>
        <PopoverPanel
          class="absolute z-10 w-48 p-4 bg-white rounded-lg shadow-lg">
          <div v-for="(subItem, subIndex) in item.items" :key="subIndex">
            <a @click="navigate(subItem.url)">{{ subItem.name }}</a>
          </div>
        </PopoverPanel>
      </Popover>
      <a v-else @click="navigate(item.url)">{{ item.name }}</a>
    </div>
  </div>
</template>
