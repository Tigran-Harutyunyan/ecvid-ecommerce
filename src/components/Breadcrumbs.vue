<script lang="ts" setup>
import BreadcrumpIcon from "@/components/ui/icons/BreadcrumpIcon.vue";

interface Props {
  breadcrumps: { label: string; link?: string }[];
}

const { breadcrumps } = defineProps<Props>();
</script>
<template>
  <ol class="flex items-center whitespace-nowrap">
    <li class="inline-flex items-center">
      <RouterLink class="breadcrump-link" to="/"> Home </RouterLink>
      <BreadcrumpIcon />
    </li>
    <li
      class="inline-flex items-center"
      v-for="({ label, link }, index) in breadcrumps"
    >
      <template v-if="link">
        <RouterLink class="breadcrump-link" to="/" v-if="link">
          {{ label }}
          <BreadcrumpIcon v-if="index < breadcrumps.length - 1" />
        </RouterLink>
      </template>

      <div v-else class="text-sm text-gray-500">
        {{ label }}
        <BreadcrumpIcon v-if="index < breadcrumps.length - 1" />
      </div>

      <BreadcrumpIcon v-if="!link && index < breadcrumps.length - 1" />
    </li>
  </ol>
</template>
