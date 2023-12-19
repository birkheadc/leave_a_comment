export class CommentModel {
  id: string = "";
  site: string = "";
  name: string = "";
  body: string = "";
  date: number = 0;

  toTitle(): string {
    return `${this.name}#${this.site}@${new Date(this.date).toLocaleString()}`
  }

  static arrayFromJson(json: any): CommentModel[] {
    if (!Array.isArray(json)) {
    const comment = new CommentModel();

    comment.id = json.id || "";
    comment.site = json.site || "";
    comment.name = json.name || "";
    comment.body = json.body || "";
    comment.date = json.date || 0;

    return [comment];
    }

    const comments: CommentModel[] = [];

    json.forEach(object => {
      const comment = new CommentModel();

      comment.id = object.id || "";
      comment.site = object.site || "";
      comment.name = object.name || "";
      comment.body = object.body || "";
      comment.date = object.date || 0;

      comments.push(comment);
    });

    return comments;
  }
}