export class Post {
    id: number | undefined;
    title: string = '';
    body: string = '';
    userId: string = '';
    tags: string[] | undefined;
    reactions: number | undefined;
    get isNew(): boolean {
        return this.id === undefined;
    }

    constructor(initializer?: any) {
        if (!initializer) return;
        if (initializer.id) this.id = initializer.id;
        if (initializer.title) this.title = initializer.title;
        if (initializer.body) this.body = initializer.body;
        if (initializer.userId) this.userId = initializer.userId;
        if (initializer.tags) this.tags = initializer.tags;
        if (initializer.reactions) this.reactions = initializer.reactions;      
    }
}