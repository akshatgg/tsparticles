import type { OutMode, OutModeAlt } from "../../../../Enums/Modes/OutMode.js";

export interface IOutModes {
    bottom?: OutMode | keyof typeof OutMode | OutModeAlt;
    default: OutMode | keyof typeof OutMode | OutModeAlt;
    left?: OutMode | keyof typeof OutMode | OutModeAlt;
    right?: OutMode | keyof typeof OutMode | OutModeAlt;
    top?: OutMode | keyof typeof OutMode | OutModeAlt;
}
