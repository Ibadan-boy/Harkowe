import { Extension } from '@tiptap/core'
import { Plugin } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

export const AISuggestion = Extension.create({
  name: 'aiSuggestion',

  addOptions() {
    return {
      suggestion: null,
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          decorations: (state) => {
            const { from } = state.selection
            const suggestion = this.options.suggestion

            if (!suggestion) return null

            // Render inline span exactly at cursor
            const deco = Decoration.widget(from, () => {
              const span = document.createElement('span')
              span.textContent = suggestion
              span.className = 'ai-suggestion'
              span.style.display = 'inline'   // force inline flow
              return span
            }, { side: 1 }) // show after cursor

            return DecorationSet.create(state.doc, [deco])
          },
        },
      }),
    ]
  },
})
