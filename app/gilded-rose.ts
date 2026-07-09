export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    private increaseValueItemNames: string[] = ['Aged Brie', 'Backstage passes to a TAFKAL80ETC concert'];

    // progressTime()
    // the sellIn value that an item enters the function
    // with represents the value of the previous day, not
    // the current day
    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            let name: string = this.items[i].name;
            let daysLeft: number = this.items[i].sellIn;
            var value: number = 0;

            // skip legendary items
            if (name === 'Sulfuras, Hand of Ragnaros')
                continue;

            // value increase if maxQuality is not exceeded
            if (this.increaseValueItemNames.includes(name))
            {
                value += 1;

                // check for extra value increase for backstage passes
                if (name === this.increaseValueItemNames[1]) {
                    if (daysLeft < 0) {
                        value = 0;
                        this.items[i].quality = 0;
                    } else if (daysLeft < 6) {
                        value += 2;
                    } else if (daysLeft < 11) {
                        value += 1;
                    }
                }
            }
            else 
            {
                // value decrease otherwise
                value -= 1;
            }

            // double the effect for expired items
            if (daysLeft < 0)
                value *= 2;

            // double the effect for conjured items
            if (name.includes('Conjured'))
                value *= 2;

            // decrease number of days left
            daysLeft -= 1;

            // modifying item quality
            this.items[i].quality = this.enforceQualityBoundaries(this.items[i].quality + value);

            // modifying item sellIn
            this.items[i].sellIn = daysLeft >= -1 ? daysLeft : -1;
        }

        return this.items;
    }

    // this function enforced value boundaries for the
    // quality property of an item and returns the correct,
    // bounded value
    private enforceQualityBoundaries(value: number) {
        if (value > 50)
            value = 50;

        if (value < 0)
            value = 0;

        return value;
    }
}
