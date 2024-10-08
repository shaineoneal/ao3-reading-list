<script setup lang="ts">
import { ref } from 'vue'

import { type Language, fetchAndParseDocument, getArchiveLink } from '#common'

const { show } = useOption('hideLanguages')

const options = ref<Language[]>([])
const open = ref(false)

whenever(open, async () => {
  const doc = await fetchAndParseDocument(getArchiveLink('/works/search'))
  const langSelect = doc.getElementById('work_search_language_id')! as HTMLSelectElement
  console.log(doc, langSelect, [...langSelect.options])
  options.value = [...langSelect.options].filter(option => option.value).map(option => ({
    label: option.text,
    value: option.value,
  }))
}, { once: true })
</script>

<template>
  <RadixPopoverRoot v-model:open="open">
    <RadixPopoverTrigger as-child>
      <button
        role="combobox"
        :aria-expanded="open"
        class="default btn"
        border="1 input"
        min-w="200px"
        flex="justify-between"
        text="sm muted-fg"
        min-h-8 px-2 py-2
      >
        {{ show.map(({ label }) => label).join(', ') || 'Select languages...' }}
        <Icon v-if="open" i-mdi-chevron-up />
        <Icon v-else i-mdi-chevron-down />
      </button>
    </RadixPopoverTrigger>
    <RadixPopoverPortal>
      <RadixPopoverContent
        class="popover animate-popover"
        border="b-1"
        z-99 h-full w-full of-hidden rounded-md shadow-md
      >
        <RadixComboboxRoot
          v-model="show"
          flex="~ col"
          default-open
          multiple
          :filter-function="(options, query) => options.filter(option => option.label.toLowerCase().includes(query.toLowerCase()) || option.value.toLowerCase().includes(query.toLowerCase()))"
          :display-value="(item) => item.label"
        >
          <div class="flex items-center px-2" border="1 input">
            <Icon i-mdi-search mr-2 w-4 op-50 />
            <RadixComboboxInput
              auto-focus
              flex="~"
              h-8 rounded-md py-3 text-sm outline-none
            />
          </div>

          <RadixComboboxContent max-h="300px" border="1 input" force-mount of-x-hidden of-y-auto>
            <RadixComboboxEmpty py-6 text-center text-sm>
              No results found
            </RadixComboboxEmpty>
            <RadixComboboxGroup>
              <RadixComboboxItem
                v-for="(option, index) in options"
                :key="index"
                class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-input"
                :value="option"
              >
                <RadixComboboxItemIndicator>
                  <Icon
                    i-mdi-check

                    mr-2 w-4
                  />
                </RadixComboboxItemIndicator>
                {{ option.label }}
              </RadixComboboxItem>
            </RadixComboboxGroup>
          </RadixComboboxContent>
        </RadixComboboxRoot>
      </RadixPopoverContent>
    </RadixPopoverPortal>
  </RadixPopoverRoot>
</template>
