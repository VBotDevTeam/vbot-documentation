<script setup lang="ts">
import { ref, computed } from 'vue'
import { useData } from 'vitepress'

const props = withDefaults(
  defineProps<{
    mode?: 'top' | 'aside'
  }>(),
  {
    mode: 'top'
  }
)

const { page, frontmatter, site } = useData()

const copied = ref(false)
const loading = ref(false)

// Chỉ hiển thị trên các trang nội dung, không hiển thị ở trang chủ hoặc trang 404
const isDoc = computed(() => {
  if (frontmatter.value?.layout === 'home') return false
  if (page.value?.isNotFound) return false
  if (!page.value?.relativePath) return false
  return true
})

function cleanMarkdown(raw: string): string {
  // Loại bỏ frontmatter chỉ chứa 'outline: deep' của VitePress để văn bản sạch hơn cho AI
  let cleaned = raw.replace(/^---\r?\noutline:\s*deep\r?\n---\r?\n+/, '')
  return cleaned.trim()
}

async function copyPageMarkdown() {
  if (copied.value || loading.value) return
  loading.value = true

  try {
    const rawPath = `${site.value.base}${page.value.relativePath}`
    const response = await fetch(rawPath)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} when fetching ${rawPath}`)
    }

    const rawText = await response.text()
    const content = cleanMarkdown(rawText)

    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(content)
    } else {
      // Fallback cho trình duyệt cũ hoặc môi trường không hỗ trợ clipboard API
      const textarea = document.createElement('textarea')
      textarea.value = content
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }

    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2500)
  } catch (err) {
    console.warn('[CopyPageButton] Không thể tải raw markdown, dùng fallback DOM text:', err)
    try {
      const docEl = document.querySelector('.vp-doc')
      const fallbackText = docEl ? (docEl as HTMLElement).innerText : ''
      if (fallbackText && navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(fallbackText)
        copied.value = true
        setTimeout(() => {
          copied.value = false
        }, 2500)
      }
    } catch (fallbackErr) {
      console.error('[CopyPageButton] Lỗi sao chép:', fallbackErr)
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div v-if="isDoc" class="copy-page-wrapper" :class="[`copy-page-${mode}`]">
    <button
      type="button"
      class="copy-page-btn"
      :class="{ 'is-copied': copied, 'is-loading': loading }"
      @click="copyPageMarkdown"
      :title="copied ? 'Đã sao chép nội dung vào Clipboard!' : 'Sao chép toàn bộ trang dạng Markdown'"
      :aria-label="copied ? 'Đã sao chép Markdown' : 'Sao chép toàn bộ trang dạng Markdown'"
    >
      <!-- Loading Spinner -->
      <svg
        v-if="loading"
        class="icon-spinner"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
      >
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25" />
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round" />
      </svg>

      <!-- Checkmark Icon khi đã copy -->
      <svg
        v-else-if="copied"
        class="icon-check"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>

      <!-- Clipboard Icon mặc định -->
      <svg
        v-else
        class="icon-copy"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>

      <span class="btn-label">
        {{ copied ? 'Đã sao chép!' : 'Sao chép Markdown' }}
      </span>
    </button>
  </div>
</template>

<style scoped>
.copy-page-wrapper {
  display: flex;
}

/* Vị trí trên đầu nội dung trang */
.copy-page-top {
  justify-content: flex-end;
  margin-bottom: 12px;
}

/* Vị trí trên mục lục aside bên phải */
.copy-page-aside {
  width: 100%;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
}

/* Khi màn hình có aside (>= 1280px), ẩn nút top để tránh lặp 2 nút */
@media (min-width: 1280px) {
  .copy-page-top {
    display: none;
  }
}

.copy-page-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
}

.copy-page-aside .copy-page-btn {
  width: 100%;
  justify-content: center;
  padding: 7px 12px;
}

.copy-page-btn:hover {
  color: var(--vp-c-brand-1, #19b24f);
  border-color: var(--vp-c-brand-1, #19b24f);
  background-color: var(--vp-c-bg-mute);
  box-shadow: 0 2px 8px rgba(25, 178, 79, 0.12);
}

.copy-page-btn:active {
  transform: scale(0.97);
}

/* Trạng thái đã sao chép thành công */
.copy-page-btn.is-copied {
  color: #19b24f;
  border-color: #19b24f;
  background-color: rgba(25, 178, 79, 0.1);
  box-shadow: 0 0 0 2px rgba(25, 178, 79, 0.2);
}

/* Icons */
.icon-copy,
.icon-check,
.icon-spinner {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
}

.icon-check {
  color: #19b24f;
  animation: check-bounce 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.icon-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes check-bounce {
  0% {
    transform: scale(0.6);
  }
  60% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
