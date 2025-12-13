package vaja1.ris.vaja1Ris.services;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.stereotype.Service;
import vaja1.ris.vaja1Ris.dao.RecipesDao;
import vaja1.ris.vaja1Ris.models.Recipe;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import vaja1.ris.vaja1Ris.services.PdfLayoutUtil;
import vaja1.ris.vaja1Ris.services.PdfRecipeFormatter;



import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class PdfExportService {

    private final RecipesDao recipesDao;

    public PdfExportService(RecipesDao recipesDao) {
        this.recipesDao = recipesDao;
    }

    public byte[] generatePdfForRecipe(Long id) throws IOException {

        Recipe recipe = recipesDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));



        PDDocument document = new PDDocument();
        PDPage page = new PDPage();
        document.addPage(page);

        PDPageContentStream content = new PDPageContentStream(document, page);

        float y = 750;

        y = PdfRecipeFormatter.drawTitle(content, y, recipe);

        y = PdfRecipeFormatter.drawWrappedText(content, y,  "Description:", recipe.getDescription());
        y = PdfRecipeFormatter.drawWrappedText(content, y, "Duration:", recipe.getDuration() + " minutes");
        y = PdfRecipeFormatter.drawWrappedText(content, y, "Category:", recipe.getCategory());
        y = PdfRecipeFormatter.drawWrappedText(content, y, "Ingredients:", recipe.getIngredients());
        y = PdfRecipeFormatter.drawWrappedText(content, y, "Instructions:", recipe.getInstructions());

        content.close();

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        document.save(baos);
        document.close();

        return baos.toByteArray();
    }

    /**
     * Generates a PDF document from a list of recipes.
     * If the list is empty, throws an IllegalArgumentException.
     * 
     * @param recipes List of recipes to include in the PDF
     * @return byte array representing the PDF document
     * @throws IOException if PDF generation fails
     * @throws IllegalArgumentException if the recipe list is empty
     */
    public byte[] generatePdf(List<Recipe> recipes) throws IOException {
        if (recipes == null || recipes.isEmpty()) {
            throw new IllegalArgumentException("Cannot generate PDF from empty recipe list");
        }

        PDDocument document = new PDDocument();
        
        for (Recipe recipe : recipes) {
            PDPage page = new PDPage();
            document.addPage(page);
            
            PDPageContentStream content = new PDPageContentStream(document, page);
            float y = 750;
            
            y = PdfRecipeFormatter.drawTitle(content, y, recipe);
            y = PdfRecipeFormatter.drawWrappedText(content, y, "Description:", recipe.getDescription());
            y = PdfRecipeFormatter.drawWrappedText(content, y, "Duration:", recipe.getDuration() + " minutes");
            y = PdfRecipeFormatter.drawWrappedText(content, y, "Category:", recipe.getCategory());
            y = PdfRecipeFormatter.drawWrappedText(content, y, "Ingredients:", recipe.getIngredients());
            y = PdfRecipeFormatter.drawWrappedText(content, y, "Instructions:", recipe.getInstructions());
            
            content.close();
        }
        
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        document.save(baos);
        document.close();
        
        return baos.toByteArray();
    }
}
