import type { Engine, IPlugin } from "@tsparticles/engine";
import type { LinkContainer } from "./Types.js";
import { LinkInstance } from "./LinkInstance.js";

class LinksPlugin implements IPlugin {
    readonly id;

    constructor() {
        this.id = "links";
    }

    getPlugin(container: LinkContainer): LinkInstance {
        return new LinkInstance(container);
    }

    loadOptions(): void {
        // do nothing
    }

    needsPlugin(): boolean {
        return true;
    }
}

/**
 * @param engine -
 * @param refresh -
 */
export async function loadLinksPlugin(engine: Engine, refresh = true): Promise<void> {
    const plugin = new LinksPlugin();

    await engine.addPlugin(plugin, refresh);
}
