<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
const route = useRoute()
const router = useRouter()

// Check if we are on an OpenAPI page
const isOpenApi = computed(() => {
  return route.path.includes('/open-api/')
})

// Detect current version ('v2' or 'v3')
const currentVersion = computed(() => {
  if (route.path.includes('/open-api/v2/')) return 'v2'
  if (route.path.includes('/open-api/v3/')) return 'v3'
  return 'v3' // default
})

const changeVersion = (event) => {
  const version = event.target.value
  const currentPath = route.path
  
  // Replace version in path
  let newPath = currentPath
  if (currentPath.includes('/open-api/v2/')) {
    newPath = currentPath.replace('/open-api/v2/', `/open-api/${version}/`)
  } else if (currentPath.includes('/open-api/v3/')) {
    newPath = currentPath.replace('/open-api/v3/', `/open-api/${version}/`)
  } else {
    newPath = `/open-api/${version}/introduction`
  }
  
  // Route to the new version path
  router.go(newPath)
}
</script>

<template>
  <Layout>
    <template #sidebar-nav-before>
      <div v-if="isOpenApi" class="version-select-container">
        <select id="version-select" :value="currentVersion" @change="changeVersion" class="version-select">
          <option value="v3">v3 (Mới nhất)</option>
          <option value="v2">v2 (Cũ)</option>
        </select>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.version-select-container {
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--vp-c-divider);
}

.version-select {
  appearance: none;
  background-color: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-brand-1, #19b24f);
  border-radius: 6px;
  padding: 8px 32px 8px 12px;
  font-family: var(--font-family, var(--vp-font-family, sans-serif));
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  cursor: pointer;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2319b24f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  transition: border-color 0.25s, background-color 0.25s;
  width: 100%;
}

.version-select:hover {
  border-color: var(--vp-c-brand-2, #22c55e);
  background-color: var(--vp-c-bg-mute);
}

.version-select:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--vp-c-brand-dimm);
}

/* Override default theme styles to make it look nicer inside the sidebar */
:deep(.VPSidebar) {
  --vp-sidebar-padding-top: 0px !important;
}
</style>
