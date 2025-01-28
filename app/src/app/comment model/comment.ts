export class Comment {
    constructor(
         public id: string ='',
        public content: string='',
        public createdAt: Date= new Date(),
        public updatedAt: Date= new Date(),
        public userId: string='',
        public workspaceItemId: string='',
        public replies?: []
    ){
       
    }
   
}