# Educational Notes: Regex & String Processing

## Sentence Splitting Regex
In the backend, we used the following regex to split the text into a list of sentences:

```javascript
content.split(/(?<=[.!?])\s+/)
```

### Breakdown:
1.  **`(?<=[.!?])` (Positive Lookbehind):**
    *   The `(?<=...)` syntax is a "lookbehind" assertion.
    *   It tells the engine to look for a position that is preceded by the characters inside the brackets `[.!?]`.
    *   **Crucially**, it doesn't "consume" or include these characters in the match itself. This ensures that the period, exclamation, or question mark stays at the end of the sentence instead of being removed during the split.

2.  **`[.!?]` (Character Class):**
    *   Matches any single character that is a period `.`, exclamation mark `!`, or question mark `?`. These are our standard sentence delimiters.

3.  **`\s+` (Whitespace Match):**
    *   `\s` matches any whitespace character (space, tab, newline).
    *   `+` means "one or more."
    *   This is the actual part of the string that gets "split" (removed and used as a separator).

### Why this approach?
If we simply split by `/[.!?]/`, we would lose the punctuation. By using a **Lookbehind** followed by **Whitespace**, we split exactly at the gap between sentences while keeping the punctuation attached to the text that preceded it.
