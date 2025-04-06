# FrameIterator

FrameIterator is a simple web application built with React that helps you generate YAML content for defining animation frames, specifically tailored for use in Minecraft resource packs (Eventinator and AnimationsCore). It allows you to quickly create the necessary YAML entries for a sequence of animation frames, handling both decimal and hexadecimal frame numbering.

## Key Features

-   **Frame Sequence Generation:** Easily generate YAML entries for a series of animation frames.
-   **Decimal and Hexadecimal Modes:** Supports both decimal (Eventinator) and hexadecimal (AnimationsCore) frame numbering.
-   **Customizable:** Define the file name, directory path, number of iterations, and starting frame.
-   **Copy and Download:** Copy the generated YAML content to the clipboard or download it as a `.yml` file.
-   **User-Friendly Interface:** Simple and intuitive interface for easy use.
-   **Reset:** You can reset all the fields with one click.

## How to Use

1.  **File Name:** Enter the base name of your animation frame files (e.g., `animation_frame`).
2.  **Directory Path:** Provide the directory path where your animation frames are located within your Minecraft resource pack (e.g., `animation/animation_1`).
3.  **Number of Iterations:** Specify the total number of frames in your animation sequence (e.g., `40`, `100`, `200`).
4.  **Starting Frame:** Set the initial frame number (e.g., `0`). The tool will increment from this number. The maximum number is 999.
5.  **Iteration Mode:** Choose between "Decimal" (for Eventinator) or "Hexagesimal" (for AnimationsCore) frame numbering.
6.  **Generate:** Click the "Generar" button to create the YAML content.
7.  **Copy:** Click the "Copiar" button to copy the generated YAML to your clipboard.
8.  **Download:** Click the "Descargar" button to download the YAML content as a `.yml` file.
9.  **Reset:** Click the "Resetear" button to reset all the fields.
10. **Copy from the text area:** You can click the text area to copy the content.

## Example

Let's say you have 10 animation frames named `animation_frame_1`, `animation_frame_2`, ..., `animation_frame_10` located in the `animation/my_animation` directory, and you want to start from frame 0 in decimal mode.

1.  **File Name:** `animation_frame`
2.  **Directory Path:** `animation/my_animation`
3.  **Number of Iterations:** `10`
4.  **Starting Frame:** `0`
5.  **Iteration Mode:** `Decimal`

After clicking "Generar", the tool will produce the following YAML content:

```yaml
animation_frame_1:
    texture: "animation/my_animation/animation_frame_1"
    ascent: 30
    height: 64
    char: "\uE000"
animation_frame_2:
    texture: "animation/my_animation/animation_frame_2"
    ascent: 30
    height: 64
    char: "\uE001"
animation_frame_3:
    texture: "animation/my_animation/animation_frame_3"
    ascent: 30
    height: 64
    char: "\uE002"
# ... and so on until animation_frame_10
```
