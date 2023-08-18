import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";
//GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response(
      "Failed to fetch all Prompts & ",
      JSON.stringify(error),
      { status: 500 }
    );
  }
};

//PATCH (update)
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const existPrompt = await Prompt.findById(params.id);
    if (!existPrompt) return new Response("Prompt not found", { status: 404 });
    existPrompt.prompt = prompt;
    existPrompt.tag = tag;
    await existPrompt.save();
    return new Response(JSON.stringify(existPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update Prompt & ", JSON.stringify(error), {
      status: 500,
    });
  }
};

//DELETE (delete)
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);
    return new Response("Prompt deleted", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete Prompt & ", JSON.stringify(error), {
      status: 500,
    });
  }
};
