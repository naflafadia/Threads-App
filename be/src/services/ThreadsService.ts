const threadData = [
    {
        id: 1,
        content: "Hello everyone",
        user: {
            id: 1,
            username: "renatta",
            name: "Renatta",
            profile_picture: "whatever.jpg"
        },
        created_at: "2023-07-31T12:34:56Z",
        likes: 10,
        reply: 5,
        isLiked: true
    },
    {
        id: 2,
        content: "Hello everybody",
        user: {
            id: 1,
            username: "ariana",
            name: "Ariana",
            profile_picture: "me.jpg"
        },
        created_at: "2023-07-31T12:34:56Z",
        likes: 25,
        reply: 6,
        isLiked: true
    },
]

export default new (class ThreadsService {
    async getAllThreads(): Promise<any[]> {
        return threadData;
    }

    async getOneThread(threadId: number): Promise<any> {
        const thread = threadData.find(thread => thread.id === threadId);
        if (!thread) {
            throw new Error("Thread not found");
        }
        return thread;
    }
})();