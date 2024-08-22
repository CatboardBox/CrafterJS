import { ColorHex, Colors, UUIDRef } from "../generic";
import { IItemStack } from "../item";
import { ResLocRef, ResourceType } from "../ref";

export type Content =
  | {
      type?: "text";
      text: string;
    }
  | {
      type?: "translatable";
      translate: unknown; //todo,
      fallback?: string;
      with?: unknown[]; //todo
    }
  | {
      type?: "score";
      score: {
        name: string;
        objective: string;
      };
    }
  | {
      type?: "selector";
      selector?: unknown; //todo
      separator?: JsonText;
    }
  | {
      type?: "keybind";
      keybind: unknown; //todo
    }
  | {
      type?: "nbt";
      source?: "block_entity";
      nbt: unknown; //todo
      interpret?: boolean;
      separator?: JsonText;
      block: unknown; //todo;
    }
  | {
      type?: "nbt";
      source?: "entity";
      nbt: unknown; //todo
      interpret?: boolean;
      separator?: JsonText;
      entity: unknown; //todo;
    }
  | {
      type?: "nbt";
      source?: "storage";
      nbt: unknown; //todo
      interpret?: boolean;
      separator?: JsonText;
      storage: unknown; //todo;
    };

export type Formatting = {
  color?: Colors | ColorHex;
  font?: unknown; //todo
  bold?: boolean;
  italic?: boolean;
  underlined?: boolean;
  strikethrough?: boolean;
  obfuscated?: boolean;
};
export type Interactivity = {
  /**
   * When the text is shift-clicked by a player, this string is inserted in their chat input. It does not overwrite any existing text the player was writing. This only works in chat messages.
   */
  insertion?: string; //todo probably string but need to check
  clickEvent?: ClickEvent;
  hoverEvent?: HoverEvent;
};

export type ClickEvent =
  | {
      action: "open_url" | "open_file";
      value: string;
    }
  | {
      action: "run_command" | "suggest_command";
      value: string;
    }
  | {
      action: "change_page";
      value: number;
    }
  | {
      action: "copy_to_clipboard";
      value: string;
    };

export type HoverEvent =
  | {
      action: "show_text";
      contents: JsonText;
    }
  | {
      action: "show_item";
      contents: IItemStack;
    }
  | {
      action: "show_entity";
      contents: {
        name?: JsonText;
        type: ResLocRef[ResourceType.EntityType];
        id: UUIDRef;
      };
    };

export type JsonText =
  | string
  | {
      content: Content;
      children?: JsonText[];
      formatting?: Formatting;
      interactivity?: Interactivity;
    };